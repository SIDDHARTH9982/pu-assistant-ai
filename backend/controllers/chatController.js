import OpenAI from 'openai';
import Chat from '../models/Chat.js';
import KnowledgeEntry from '../models/KnowledgeEntry.js';

const buildSystemPrompt = (knowledgeContext) => {
  return `You are PU Assistant AI — the official intelligent assistant for Poornima University, Jaipur, Rajasthan, India.

Your role is to help students, parents, aspirants, and visitors with accurate, helpful information about Poornima University.

KNOWLEDGE BASE:
${knowledgeContext}

BEHAVIOR RULES:
1. Answer ONLY questions related to Poornima University and its services.
2. If asked something unrelated, politely redirect: "I'm specialized for Poornima University queries. Could you ask something about the university?"
3. Format answers clearly with headings, bullet points, and tables where useful.
4. Understand Hinglish inputs (mix of Hindi and English).
5. Handle spelling mistakes gracefully.
6. If specific information is not in the knowledge base, say: "I don't have that specific detail right now. Please contact Poornima University at +91-141-5160400 or visit poornima.org"
7. Never invent fake facts, fees, dates, or names.
8. Be warm, professional, and helpful.
9. Keep responses concise but complete.

TOPICS YOU HANDLE:
- Admissions process and eligibility
- Courses and departments (B.Tech, MBA, MCA, etc.)
- Fee structure and payment
- Scholarships and financial aid
- Hostel and accommodation
- Placements and career services
- Campus facilities
- Faculty information
- Contact details
- University rankings and achievements
- Events and activities
- PhD and research programs
- Transport facilities
- Library services
- Internship programs
- Alumni network
- Examination schedules and results`;
};

export const sendMessage = async (req, res) => {
  try {
    const { message, chatId } = req.body;
    const userId = req.user._id;

    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, message: 'Message is required.' });
    }

    const knowledgeEntries = await KnowledgeEntry.find({ isActive: true })
      .select('category title content')
      .limit(20);

    const knowledgeContext = knowledgeEntries
      .map(e => `[${e.category.toUpperCase()}] ${e.title}:\n${e.content}`)
      .join('\n\n---\n\n');

    const systemPrompt = buildSystemPrompt(knowledgeContext);

    let chat = chatId ? await Chat.findOne({ _id: chatId, userId }) : null;

    const messageHistory = chat ? chat.messages.slice(-10).map(m => ({
      role: m.role,
      content: m.content
    })) : [];

    messageHistory.push({ role: 'user', content: message });

    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.5-flash", 
      max_tokens: 2000,
      messages: [
        { role: "system", content: systemPrompt },
        ...messageHistory
      ]
    });

    const assistantReply = completion.choices[0].message.content;

    if (chat) {
      chat.messages.push({ role: 'user', content: message });
      chat.messages.push({ role: 'assistant', content: assistantReply });
      if (chat.title === 'New Conversation' && chat.messages.length === 2) {
        chat.title = message.slice(0, 60);
      }
      await chat.save();
    } else {
      chat = await Chat.create({
        userId,
        title: message.slice(0, 60),
        messages: [
          { role: 'user', content: message },
          { role: 'assistant', content: assistantReply }
        ]
      });
    }

    res.json({
      success: true,
      reply: assistantReply,
      chatId: chat._id,
      chatTitle: chat.title
    });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ success: false, message: 'Failed to process message. Please try again.' });
  }
};

export const getChatHistory = async (req, res) => {
  try {
    const chats = await Chat.find({ userId: req.user._id, isActive: true })
      .select('title messages createdAt updatedAt')
      .sort({ updatedAt: -1 })
      .limit(20);

    res.json({ success: true, chats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getChatById = async (req, res) => {
  try {
    const chat = await Chat.findOne({ _id: req.params.id, userId: req.user._id });
    if (!chat) return res.status(404).json({ success: false, message: 'Chat not found.' });
    res.json({ success: true, chat });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteChat = async (req, res) => {
  try {
    await Chat.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { isActive: false }
    );
    res.json({ success: true, message: 'Chat deleted.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
