import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import User from '../models/User.js';
import FAQ from '../models/FAQ.js';
import Notice from '../models/Notice.js';
import KnowledgeEntry from '../models/KnowledgeEntry.js';

dotenv.config();

const knowledgeData = [
  {
    category: 'university_overview',
    title: 'About Poornima University',
    content: `Poornima University is a prestigious private university located in Jaipur, Rajasthan, India. Established in 2012 under the Rajasthan Private Universities Act, it is run by the Poornima Group of Colleges — a trusted name in education since 1999.

ADDRESS:
Poornima University, IS-2027-2028, Ramchandrapura,
Near NH-8 (Delhi-Jaipur Highway), Sitapura Extension,
Jaipur – 302022, Rajasthan, India

KEY FACTS:
- Founded: 2012
- Type: Private (Deemed to be University)
- Campus Area: 25+ acres
- Total Enrolled Students: 7,000+
- Total Faculty: 350+
- Programs: 50+ undergraduate, postgraduate, doctoral
- Affiliation: UGC recognized | NAAC Accredited
- Website: www.poornima.org
- Main Phone: +91-141-5160400
- Toll Free: 1800-300-40404

LEADERSHIP:
- Chancellor: Sh. Rajeev Jain
- Vice Chancellor: Prof. (Dr.) Dharmesh Dhabliya
- Registrar: Dr. Karunesh Saxena

VISION: "To be a globally recognized university fostering innovation, entrepreneurship, and excellence."

CAMPUS BUILDINGS AND BLOCKS:
- Block A: CSE, IT, AI departments
- Block B: ECE, EE departments + Applied Science
- Block C: MCA, BCA, Computer Labs
- Block D: Science Labs (B.Sc, M.Sc)
- Block E: Management School (MBA, BBA)
- Block F: Law School
- Block G: Administrative Office, VC Room, Registrar
- Block H: Library (Central + Digital)
- Block I: Research & Innovation Centre
- Auditorium Block: 2000-seat main hall + 2 mini auditoriums
- Boys Hostel Complex (3 buildings), Girls Hostel Complex (2 buildings)
- Medical Center, Cafeteria, SBI Bank Branch & ATM, Guest House`,
    tags: ['overview', 'about', 'university', 'poornima', 'jaipur', 'naac', 'ugc', 'chancellor', 'vc', 'blocks']
  },

  {
    category: 'admissions',
    title: 'Admission Process at Poornima University',
    content: `ADMISSION PROCESS:
1. Online Application: Visit poornima.org → Admissions → Apply Online
2. Document Submission: Upload required documents
3. Merit/Entrance Based Selection: Based on qualifying exam scores
4. Counseling: Attend in-person or virtual counseling session
5. Fee Payment: Pay admission fee to confirm seat

KEY ADMISSION DATES (2024-25):
- Application Start: March 2024
- Last Date for Application: July 31, 2024
- Counseling Rounds: July – August 2024
- Classes Start: August 2024

REQUIRED DOCUMENTS:
- 10th Mark Sheet & Certificate
- 12th Mark Sheet & Certificate (for UG)
- Graduation Mark Sheets (for PG)
- Transfer Certificate, Character Certificate
- Passport size photographs (6), Aadhar Card
- Category Certificate (if applicable)
- JEE/CAT/MAT Score Card (if applicable)

CONTACT FOR ADMISSIONS:
- Phone: +91-9887051160, +91-9887151160
- Email: admissions@poornima.org
- Website: poornima.org`,
    tags: ['admission', 'apply', 'application', 'process', 'enrollment', 'documents', 'counseling']
  },

  {
    category: 'eligibility',
    title: 'Eligibility Criteria for All Programs',
    content: `B.Tech (Engineering):
- Class 12 with Physics, Chemistry, Mathematics
- Minimum 45% (40% for SC/ST) aggregate
- Valid JEE Main score preferred; PUAT accepted

MBA:
- Graduation in any discipline with minimum 50%
- CAT/MAT/CMAT/RMAT score preferred; work experience a plus

MCA:
- BCA/B.Sc (CS/IT) or equivalent with minimum 50%
- Mathematics at 10+2 level required

B.Sc / BBA:
- Class 12 in relevant stream, minimum 45%

M.Tech:
- B.Tech in relevant field with minimum 55%; GATE preferred

PhD:
- M.Tech/M.Sc/MBA with minimum 55%; UGC-NET/GATE/JRF preferred`,
    tags: ['eligibility', 'criteria', 'qualification', 'marks', 'percentage', 'btech', 'mba', 'phd']
  },

  {
    category: 'courses',
    title: 'All Courses and Programs Offered',
    content: `ENGINEERING – B.Tech (4 Years):
- Computer Science & Engineering (CSE)
- CSE with AI & Machine Learning (CSE-AI/ML)
- CSE with Data Science (CSE-DS)
- CSE with Cyber Security (CSE-CS)
- CSE with Internet of Things (CSE-IoT)
- Electronics & Communication Engineering (ECE)
- Electrical Engineering (EE)
- Mechanical Engineering (ME)
- Civil Engineering (CE)
- Information Technology (IT)

POSTGRADUATE ENGINEERING:
- M.Tech in CSE, ECE, Mechanical

MANAGEMENT:
- MBA (2 Years) – Finance, Marketing, HR, Operations, International Business
- BBA (3 Years), Executive MBA

COMPUTER APPLICATIONS:
- MCA (2 Years), BCA (3 Years)

SCIENCE:
- B.Sc (Mathematics, Physics, Chemistry, Computer Science)
- M.Sc (Mathematics, Physics, Chemistry, CS)

LAW:
- BA LLB (Integrated, 5 Years), LLB (3 Years)

DIPLOMA (Polytechnic):
- Diploma in CSE, ECE, ME, CE (3 Years each)

DOCTORAL:
- PhD in Engineering, Management, Science, Law, Applied Sciences`,
    tags: ['courses', 'programs', 'btech', 'mba', 'mca', 'bca', 'bsc', 'engineering', 'mtech', 'llb', 'phd']
  },

  {
    category: 'fee_structure',
    title: 'Complete Fee Structure 2024-25',
    content: `TUITION FEES (Annual):
- CSE / CSE-AI/ML / CSE-DS / CSE-CS / IT: Rs.1,10,000/year
- ECE / EE: Rs.95,000/year
- ME / CE: Rs.85,000/year
- M.Tech: Rs.95,000/year
- MBA: Rs.1,20,000/year
- BBA: Rs.65,000/year
- MCA: Rs.90,000/year
- BCA: Rs.60,000/year
- B.Sc: Rs.40,000/year
- M.Sc: Rs.50,000/year
- LLB / BA LLB: Rs.75,000/year
- Diploma (Polytechnic): Rs.45,000/year

HOSTEL FEES (Annual, mess included):
- Boys Hostel (Non-AC, 3-sharing): Rs.80,000/year
- Girls Hostel (Non-AC, 3-sharing): Rs.85,000/year
- AC Room (extra): Rs.25,000/year
- Single Occupancy (extra): Rs.15,000/year
- Day Scholar Mess: Rs.2,500/month

OTHER CHARGES (Annual):
- Admission Registration (one-time): Rs.2,000
- Examination Fee: Rs.3,000/year
- Library Fee: Rs.2,000/year
- Sports & Cultural: Rs.1,500/year
- Student Welfare: Rs.1,000/year

PAYMENT MODES:
- Online: erp.poornima.org
- NEFT/RTGS or Demand Draft in favor of "Poornima University"

Contact: accounts@poornima.org | +91-141-5160400`,
    tags: ['fee', 'fees', 'tuition', 'cost', 'charges', 'payment', 'hostel fee', 'btech fee', 'mba fee']
  },

  {
    category: 'scholarships',
    title: 'Scholarships and Financial Aid',
    content: `MERIT SCHOLARSHIPS:
- Vice Chancellor Scholarship: 100% tuition waiver (JEE/Board rank 1)
- Gold Merit: 50% tuition waiver (95%+ in Class 12)
- Silver Merit: 25% tuition waiver (90-94% in Class 12)
- Bronze Merit: 10% tuition waiver (85-89% in Class 12)

GOVERNMENT SCHOLARSHIPS:
- Rajasthan State Merit Scholarship
- SC/ST Scholarship (Government of India)
- OBC Scholarship
- Minority Scholarship (Mukhyamantri Anuprati Coaching)
- Prime Minister Scholarship Scheme

SPORTS SCHOLARSHIPS:
- National level players: 50-100% fee waiver
- State level players: 25-50% fee waiver

DEFENSE/EX-SERVICEMEN: 25% tuition fee concession

POORNIMA INTERNAL SCHOLARSHIPS:
- Financial Need-Based: Up to 30% waiver (family income < Rs.2.5 LPA)
- Alumni Referral: 5% waiver
- Sibling Scholarship: 10% waiver for 2nd sibling enrolled

HOW TO APPLY:
1. Fill Scholarship Application Form during admission counseling
2. Attach supporting documents (marksheets, income certificate)
3. Scholarship Committee reviews within 15 days
4. Disbursement directly to fee account

Contact: scholarships@poornima.org`,
    tags: ['scholarship', 'financial aid', 'merit', 'fee waiver', 'sc st', 'sports', 'gold silver bronze']
  },

  {
    category: 'hostel',
    title: 'Hostel – Rooms, Mess, Rules and Contact',
    content: `BOYS HOSTEL (PU Boys Hostel 1, 2, 3):
- Total Capacity: 1,500+ students
- Room Types: 3-sharing (standard), 2-sharing (on request), Single room (limited, Rs.15,000 extra/year)
- Each floor: Attached bathrooms, common room with TV, water cooler (RO), washing area
- Facilities: High-speed Wi-Fi (50 Mbps/floor), biometric attendance, CCTV, study room (6 AM-11 PM), gym
- Warden: Mr. Suresh Kumar | hostel@poornima.org | Ext. 206

GIRLS HOSTEL (PU Girls Hostel 1, 2):
- Total Capacity: 1,000+ students
- Fully enclosed secure campus with female staff 24x7
- Room Types: 3-sharing (standard), 2-sharing (available)
- Facilities: Female security guards, beauty parlour room (Tue & Thu), indoor recreation, sanitary vending machines, lady doctor twice/week
- Warden: Ms. Sunita Bhardwaj | Ext. 207

MESS / DINING:
- Three meals + evening snacks daily (veg & non-veg options)
- Meal Timings: Breakfast 7-9 AM | Lunch 12:30-2:30 PM | Snacks 5-6 PM | Dinner 7:30-9:30 PM
- Monthly rotating menu; special meals on festivals
- Mess committee of student representatives reviews quality monthly

HOSTEL RULES:
- Curfew: 10:00 PM (boys), 9:00 PM (girls)
- Visitors: 10 AM – 6 PM (same-gender only, reception area only)
- Ragging strictly prohibited (Anti-ragging cell active)
- Smoking and alcohol banned – immediate expulsion
- Biometric attendance twice daily

FEES (Annual, mess included):
- Boys Non-AC 3-sharing: Rs.80,000
- Girls Non-AC 3-sharing: Rs.85,000
- AC Room (extra): Rs.25,000/year | Single room (extra): Rs.15,000/year

CONTACT:
- Phone: +91-141-5160400 Ext. 206 (Boys) / 207 (Girls)
- Email: hostel@poornima.org`,
    tags: ['hostel', 'accommodation', 'mess', 'room', 'boys hostel', 'girls hostel', 'warden', 'curfew', 'hostel fee', 'hostel rules', 'dining']
  },

  {
    category: 'faculty',
    title: 'Faculty, Department Heads and Key Contacts',
    content: `SCHOOL OF ENGINEERING & TECHNOLOGY:
Dean: Dr. Rajesh Mathur | rajesh.mathur@poornima.org | Ext. 301

CSE Department:
- HOD: Dr. Pradeep Kumar Tiwari | pradeep.tiwari@poornima.org | Ext. 302
- Prof. Anil Kumar Sharma (AI & ML)
- Dr. Suman Lata (Data Structures & Algorithms)
- Prof. Rahul Bansal (Web Technologies)
- Dr. Kavita Meena (Database Management)
- Prof. Nikhil Agarwal (Cloud Computing)
- Dr. Priya Sharma (Computer Networks)
- Prof. Deepak Vyas (Operating Systems)

ECE Department:
- HOD: Dr. Ajay Singh | ajay.singh@poornima.org | Ext. 310
- Prof. Sandeep Kumar (VLSI Design)
- Dr. Meena Kumari (Digital Signal Processing)
- Prof. Vishal Jain (Embedded Systems)

Electrical Engineering (EE):
- HOD: Dr. Mahesh Chand | mahesh.chand@poornima.org | Ext. 315
- Prof. Renu Jain (Power Systems), Dr. Suresh Kumar (Control Systems)

Mechanical Engineering (ME):
- HOD: Dr. Sunil Gupta | sunil.gupta@poornima.org | Ext. 320
- Prof. Rajiv Mehta (Thermodynamics), Dr. Pankaj Sharma (Manufacturing), Prof. Ankit Joshi (CAD/CAM)

Civil Engineering (CE):
- HOD: Dr. Ramesh Chand Jain | ramesh.jain@poornima.org | Ext. 325
- Prof. Deepak Kumar (Structural), Dr. Sunita Verma (Environmental)

Applied Sciences (Physics, Chemistry, Maths):
- HOD: Dr. Manish Trivedi | manish.trivedi@poornima.org | Ext. 430
- Dr. Sunita Sharma (Engineering Mathematics)
- Prof. Arun Kumar (Engineering Physics)
- Dr. Neelam Gupta (Engineering Chemistry)

SCHOOL OF MANAGEMENT (MBA/BBA):
- Dean: Dr. Arvind Sharma | arvind.sharma@poornima.org | Ext. 401
- HOD: Dr. Neha Gupta | neha.gupta@poornima.org
- Prof. Rajesh Joshi (Finance), Dr. Seema Agarwal (Marketing), Prof. Suresh Menon (HR)

SCHOOL OF COMPUTER APPLICATIONS (MCA/BCA):
- HOD: Dr. Sanjay Sharma | sanjay.sharma@poornima.org | Ext. 410
- Prof. Alka Mishra (Java), Dr. Vikram Solanki (Software Engineering)

SCHOOL OF SCIENCE:
- HOD: Dr. Sudha Jain | sudha.jain@poornima.org | Ext. 420

SCHOOL OF LAW:
- Dean: Dr. Rashmi Singh | rashmi.singh@poornima.org | Ext. 501
- Prof. Priya Vyas (Constitutional Law), Dr. Mukesh Pareek (Criminal Law)`,
    tags: ['faculty', 'professor', 'HOD', 'department head', 'teacher', 'staff', 'dean', 'contact faculty', 'professor name', 'teacher contact']
  },

  {
    category: 'facilities',
    title: 'Laboratories – Complete List',
    content: `COMPUTER SCIENCE & IT LABS:
1. Programming Lab – 60 systems (Core i5, 8GB RAM, Ubuntu/Windows)
2. Advanced Programming Lab – 50 systems (Core i7, 16GB RAM)
3. AI & Machine Learning Lab – GPU-enabled (NVIDIA GTX), TensorFlow, PyTorch
4. Data Science Lab – Jupyter, Python, R, MATLAB
5. Cyber Security Lab – Kali Linux, Wireshark, Metasploit, ethical hacking tools
6. IoT & Embedded Lab – Raspberry Pi, Arduino, sensors, NodeMCU
7. Cloud Computing Lab – AWS/Azure/GCP student accounts
8. DBMS Lab – Oracle, MySQL, PostgreSQL servers
9. Mobile App Development Lab – Android Studio, Flutter
10. Software Testing Lab – Selenium, JUnit

ELECTRONICS & COMMUNICATION LABS:
11. Digital Electronics Lab – ICs, breadboards, logic analyzers
12. Analog Electronics Lab – Oscilloscopes, signal generators
13. Microprocessor & Microcontroller Lab – 8085/8086, ARM kits
14. VLSI Design Lab – Cadence, Xilinx FPGA boards
15. Communication Lab – DSP kits, fiber optic setups
16. PCB Design Lab – Eagle, Altium software

ELECTRICAL ENGINEERING LABS:
17. Electrical Machines Lab – AC/DC motors, transformers
18. Power Electronics Lab – IGBT, MOSFET modules
19. Control Systems Lab – MATLAB Simulink, PLC trainers
20. High Voltage Lab

MECHANICAL ENGINEERING LABS:
21. Workshop – Fitting, welding, sheet metal
22. Thermal Engineering Lab – IC engines, heat exchangers
23. CAD/CAM Lab – AutoCAD, SolidWorks, CATIA
24. Fluid Mechanics Lab, Material Testing Lab, Metrology Lab
25. 3D Printing Lab – FDM printers, rapid prototyping

CIVIL ENGINEERING LABS:
26. Concrete & Materials Testing Lab
27. Environmental Engineering Lab
28. Soil Testing Lab (Geotechnical)
29. Survey Lab – Total stations, GPS equipment

MANAGEMENT LABS:
30. Business Analytics Lab – Power BI, Tableau, Advanced Excel
31. Finance Lab – Bloomberg terminal, stock market simulation
32. Entrepreneurship Lab – SAP, ERP software

RESEARCH & INNOVATION LABS:
33. Centre of Excellence in AI/ML (NVIDIA sponsored)
34. Robotics & Automation Lab – Industrial robot arms
35. Cybersecurity Research Center
36. Innovation & Incubation Cell (student startups)
37. Green Energy Lab – Solar panels, wind energy models

OTHER:
- 22 smart classrooms with projectors + Wi-Fi
- 3 Seminar Halls (200, 500, 1000 capacity)
- Main Auditorium (2000-seat capacity)
- 24x7 internet (1 Gbps backbone, 800+ Wi-Fi access points)`,
    tags: ['labs', 'laboratory', 'computer lab', 'mechanical lab', 'AI lab', 'IoT', 'robotics', 'VLSI', '3D printing', 'smart classroom']
  },

  {
    category: 'facilities',
    title: 'Sports, Clubs, Events and Campus Life',
    content: `SPORTS FACILITIES:
Outdoor: Full-size Cricket Ground (with practice nets), Football Ground (FIFA turf), 2 Basketball Courts, 2 Volleyball Courts, 4 Badminton Courts (indoor), Handball Ground, Athletics Track, Kho-Kho, Kabaddi
Indoor: Table Tennis Hall (6 tables), Carrom & Chess Room, Squash Court, Gymnasium (separate for boys/girls), Yoga & Meditation Center
Swimming: Olympic-size Swimming Pool (open Oct-Mar); classes available at Rs.3,000/month

ANNUAL SPORTS FEST: "SPARDHA" held every January
Inter-departmental tournaments throughout the year
Part of AIU (Association of Indian Universities) sports circuit

STUDENT CLUBS (30+ clubs):
Technical: GDSC (Google Developer Student Clubs), Coding Club, Robotics Club, IEEE Student Branch
Cultural: Dance Club (Mudra), Music Band, Drama Club (Rangmanch), Fine Arts Club
Literary: Debate Club, English Language Club, Writers Circle
Social: NSS, NCC, Rotaract Club, Environment Club
Entrepreneurship: E-Cell, Startup Incubation Club

ANNUAL EVENTS:
- Technova (Technical Fest) – February
- Sparsha (Cultural Fest) – March
- Convocation – October/November
- Freshers' Party – August
- Alumni Meet – December

CAFETERIA & FOOD:
- Main Cafeteria (500+ seats, 7 AM–9 PM)
- Juice & Snacks Corner (near Library)
- Engineering Block Canteen, Management Cafe
- Food stalls: Pizza, Momos, South Indian, Rajasthani Thali

HEALTH SERVICES:
- Medical Clinic: Doctor Mon-Sat 9 AM–5 PM
- Nurse on duty 24x7 in hostel
- Ambulance on standby
- Tie-up with Fortis, Narayana, Manipal hospitals
- Counseling/Wellness Center (mental health support)

ON CAMPUS AMENITIES:
- SBI ATM + Bank branch, ICICI ATM near main gate
- Stationery store, Photocopy center, Prayer room
- Guest house for parents/visitors`,
    tags: ['sports', 'gym', 'swimming', 'clubs', 'cafeteria', 'events', 'technova', 'sparsha', 'cricket', 'football', 'health', 'ATM', 'GDSC', 'NSS', 'NCC']
  },

  {
    category: 'placements',
    title: 'Placements and Career Services',
    content: `PLACEMENT STATISTICS (2023-24):
- Total Students Placed: 2,100+
- Companies Visited: 300+
- Highest Package: Rs.42 LPA (International offer)
- Average Package: B.Tech Rs.5.2 LPA | MBA Rs.6.8 LPA
- 90%+ eligible students placed

TOP RECRUITERS:
Technology: TCS, Infosys, Wipro, HCL, Cognizant, Accenture, Tech Mahindra, Capgemini, IBM
Product: Amazon, Flipkart, Juspay, Paytm, Razorpay, Ola, Zomato
Banking/Finance: HDFC Bank, ICICI Bank, Kotak, Bajaj Finance, Axis Bank
Manufacturing: Mahindra, Tata Motors, L&T, Bosch, Schneider Electric
Consulting: Deloitte, EY, KPMG, PwC
Government/PSU: DRDO, ISRO, RVPN, JVVNL, Indian Navy MR

TRAINING PROVIDED (Semester 5-8):
- Aptitude & Reasoning (AMCAT/eLitmus format)
- Communication & Soft Skills
- Technical coding: DSA, Java, Python, SQL
- Mock interviews and Group Discussions
- LinkedIn profile and resume building
- Industry mentorship program

Training & Placement Head: Dr. Arvind Sharma (TPO)
Email: placements@poornima.org | Phone: +91-141-5160400 Ext. 210`,
    tags: ['placement', 'jobs', 'salary', 'package', 'recruitment', 'tcs', 'infosys', 'amazon', 'career', 'TPO']
  },

  {
    category: 'contact',
    title: 'All Contact Details of Poornima University',
    content: `MAIN CAMPUS ADDRESS:
Poornima University, IS-2027-2028, Ramchandrapura,
Sitapura Extension, Near NH-8,
Jaipur – 302022, Rajasthan, India

GENERAL ENQUIRY:
- Phone: +91-141-5160400 / +91-141-5160401
- Toll Free: 1800-300-40404
- Email: info@poornima.org | Website: www.poornima.org

ADMISSIONS: +91-9887051160, +91-9887151160 | admissions@poornima.org
EXAMINATIONS: exam@poornima.org | Ext. 204
PLACEMENTS: placements@poornima.org | Ext. 210
HOSTEL: hostel@poornima.org | Ext. 206 (Boys) / 207 (Girls)
ACCOUNTS/FEES: accounts@poornima.org | Ext. 208
LIBRARY: library@poornima.org | Ext. 220
VICE CHANCELLOR: vc@poornima.org | Ext. 101
TRANSPORT: Ext. 215
SCHOLARSHIPS: scholarships@poornima.org
RESEARCH: research@poornima.org

WORKING HOURS: Monday–Saturday 9 AM – 5 PM
SOCIAL MEDIA:
- Facebook: facebook.com/PoornimaUniversity
- Instagram: @poornima_university
- LinkedIn: linkedin.com/school/poornima-university
- YouTube: Poornima University Official`,
    tags: ['contact', 'phone', 'email', 'address', 'location', 'enquiry', 'toll free', 'hostel contact', 'admissions contact', 'TPO contact']
  },

  {
    category: 'examinations',
    title: 'Examination System and Academic Calendar',
    content: `EXAMINATION PATTERN (Semester System):
- Internal Assessment: 30 marks (Mid-term: 15 + Assignments/Attendance: 15)
- End-semester Exam: 70 marks
- Total: 100 marks per subject

GRADING SYSTEM:
O (Outstanding): 90-100 = 10 GP | A+ (Excellent): 80-89 = 9 GP
A (Very Good): 70-79 = 8 GP | B+ (Good): 60-69 = 7 GP
B (Average): 55-59 = 6 GP | C (Satisfactory): 50-54 = 5 GP
F (Fail): Below 50 = 0 GP

PASSING CRITERIA:
- Minimum 35% in end-semester exam
- Minimum 50% overall aggregate (internal + external)
- Minimum 75% attendance required to appear in exams

ACADEMIC CALENDAR 2024-25:
Odd Semester: July 29 – November 15, 2024
Mid-term: September 16-20, 2024
End-Sem Exams: November 18 – December 7, 2024
Winter Break: December 8 – January 5, 2025
Even Semester: January 6 – April 30, 2025
End-Sem Exams: May 1-20, 2025
Summer Break/Internship: May 21 – July 28, 2025

Contact: exam@poornima.org | Ext. 204`,
    tags: ['exam', 'examination', 'result', 'marks', 'grading', 'cgpa', 'attendance', 'semester', 'academic calendar']
  },

  {
    category: 'transport',
    title: 'Transport – Bus Routes, Timings and Passes',
    content: `Poornima University runs 40+ buses on 20+ routes across Jaipur.

MAJOR BUS ROUTES:
Route 1: Malviya Nagar – Tonk Road – University
Route 2: Mansarovar – Sodala – Shyam Nagar – University
Route 3: Civil Lines – Ram Nagar – University
Route 4: Vaishali Nagar – Kalwar Road – University
Route 5: Sanganer – Sitapura – University
Route 6: Chitrakoot – Vidhyadhar Nagar – University
Route 7: Jhotwara – Purani Basti – University
Route 8: Ajmer Road – Sindhi Camp – University
Route 9: Pratap Nagar – Triveni – University
Route 10: C-Scheme – MI Road – University
Route 11: Murlipura – Vidyut Nagar – University
Route 12: Jagatpura – Sitapura – University
Route 13: Sirsi Road – University
Route 14: Durgapura – University
Route 15: Harmada – Kalwar – University

BUS PASS FEES:
- Annual Pass: Rs.18,000/year
- Semester Pass: Rs.10,000/semester
- Monthly Pass: Rs.2,000/month

FEATURES:
- GPS-tracked buses (track via PU Connect app)
- AC buses on select routes; Lady marshal on all buses
- First bus: 7:00 AM | Last return: 6:30 PM
- Runs Monday–Saturday

APPLY: Transport Office Ext. 215 | erp.poornima.org → Transport Pass`,
    tags: ['transport', 'bus', 'route', 'commute', 'bus pass', 'mansarovar', 'vaishali', 'malviya nagar', 'civil lines']
  },

  {
    category: 'library',
    title: 'Central Library – Resources, Timings and Services',
    content: `COLLECTION:
- 1,00,000+ physical books across all disciplines
- 5,000+ national and international journals
- 50,000+ e-books and e-journals
- Previous year question papers archive
- National and international newspapers

DIGITAL RESOURCES:
- NPTEL course videos (free access for all students)
- DELNET database, IEEE Xplore (engineering)
- J-GATE (research papers), ProQuest Digital Library
- OPAC: library.poornima.org

LIBRARY TIMINGS:
- Monday–Saturday: 8:00 AM – 8:00 PM
- Sunday: 10:00 AM – 4:00 PM
- During exams: 8:00 AM – 10:00 PM

BOOK BORROWING:
- UG: 4 books, 14 days | PG: 6 books, 21 days | Faculty: 10 books, 30 days
- Fine: Rs.2 per day per book for late return

FACILITIES:
- 400+ seat air-conditioned reading room
- 6 group discussion rooms (bookable online)
- Print, scan, photocopy: Rs.1 per page
- Wi-Fi throughout

Librarian: Mr. Rajesh Pareek
Contact: library@poornima.org | Ext. 220`,
    tags: ['library', 'books', 'e-library', 'NPTEL', 'IEEE', 'reading room', 'journal', 'digital library', 'OPAC']
  },

  {
    category: 'internships',
    title: 'Internship Programs – Requirements & Companies',
    content: `INTERNSHIP BY PROGRAM:
- B.Tech: Mandatory 6-month industrial training (6th/7th semester)
- MBA: Mandatory 2-month summer internship (after 2nd semester)
- MCA: Mandatory 6-month internship (final semester)
- BCA/BBA: Optional but encouraged

WHERE STUDENTS INTERN:
Technology: Microsoft, Amazon, TCS, Infosys, Wipro, startups
Finance: HDFC Bank, Kotak, Bajaj Finance, CA firms, NSE, BSE
Manufacturing: Mahindra, TVS Motor, Bosch, Siemens
Government/R&D: DRDO, ISRO, RVPN, JVVNL
Healthcare: Apollo, Fortis

STIPEND RANGE:
- Tier 1 companies: Rs.15,000–50,000/month
- Mid-size companies: Rs.5,000–15,000/month
- Startups: Rs.3,000–8,000/month
- Government/PSU: Rs.2,000–5,000/month

PROCESS:
1. Register on internship.poornima.org
2. Apply for listed internships from T&P Cell
3. Get selected, submit acceptance to HOD
4. Complete with weekly reports to faculty mentor
5. Submit final report + viva (4–6 academic credits)

Contact: internship@poornima.org`,
    tags: ['internship', 'training', 'stipend', 'industrial training', 'summer internship', 'credits']
  },

  {
    category: 'phd_research',
    title: 'PhD and Research Programs',
    content: `PhD PROGRAMS AVAILABLE IN:
Engineering & Technology (CSE, ECE, EE, ME, CE), Management, Applied Sciences, Computer Applications, Law

ELIGIBILITY:
- M.Tech/M.Sc/MBA with minimum 55%
- UGC-NET / GATE / JRF preferred (mandatory for fellowship)

DURATION:
- Full-time: 3–6 years | Part-time: 4–8 years

PROCESS: Apply at research.poornima.org → PUAT-PhD test → Interview → Supervisor allotment → Research → Annual review → Pre-submission seminar → Thesis + Viva

FELLOWSHIPS:
- JRF: Rs.31,000/month | SRF: Rs.35,000/month (UGC/CSIR qualified)
- University scholarship for full-time students (limited seats)

ACTIVE RESEARCH AREAS:
AI & Machine Learning, Cybersecurity & Blockchain, IoT & Smart Systems, Renewable Energy, Supply Chain Management, Constitutional Law

INTERNATIONAL COLLABORATIONS:
University of Manchester (UK), RMIT (Australia), NTU (Singapore)

Contact: research@poornima.org | Dr. Karunesh Saxena (Research Dean)`,
    tags: ['phd', 'research', 'doctorate', 'thesis', 'fellowship', 'JRF', 'NET', 'GATE', 'research programs']
  },

  {
    category: 'rankings',
    title: 'Rankings, Accreditations and Industry Recognition',
    content: `ACCREDITATIONS:
- NAAC Accredited: B++ Grade
- UGC Recognized University
- AICTE Approved (engineering programs)
- Bar Council of India Approved (law programs)
- ISO 9001:2015 Certified

NATIONAL RANKINGS:
- NIRF Engineering: Among Top 200 in India
- Outlook India: Top 50 Private Universities (Rajasthan)
- The Week: Featured in Best Universities list

AWARDS:
- Best Private University in Rajasthan – 2022
- Best Placement Record Private University Rajasthan – 2023
- Innovation & Entrepreneurship Award – CII
- Green Campus Certification

INDUSTRY PROGRAMS:
- TCS iON ILP Partner Campus
- Infosys Campus Connect Partner
- Microsoft Azure University Program – Gold Partner
- Google Developer Student Clubs (GDSC) active chapter
- NASSCOM FutureSkills Partner

RESEARCH:
- 500+ papers/year in Scopus/WoS journals
- 20+ patents filed/granted
- 3 DST-funded research projects ongoing
- MoU with 50+ national and international organizations`,
    tags: ['ranking', 'naac', 'nirf', 'accreditation', 'award', 'tcs', 'infosys', 'microsoft', 'google']
  },

  {
    category: 'alumni',
    title: 'Alumni Network',
    content: `Poornima University has 15,000+ alumni across India and abroad.

ALUMNI ASSOCIATION:
- Name: Poornima Alumni Association (PAA)
- Website: alumni.poornima.org | Email: alumni@poornima.org
- Annual Meet: Every December on campus

NOTABLE ALUMNI:
- Rahul Sharma – Software Engineer at Google USA (CSE 2018)
- Priya Agarwal – Senior Analyst, McKinsey (MBA 2017)
- Arjun Verma – Founder, TechBridge Startup (CSE 2016)
- Sneha Mathur – IAS Officer, Rajasthan Cadre (Law 2015)
- Ankit Goyal – Product Manager, Flipkart (MBA 2019)
- Deepak Choudhary – DRDO Scientist (ECE 2017)

ALUMNI ACHIEVEMENTS:
- 500+ in top tech companies (Google, Amazon, Microsoft)
- 200+ in government/civil services
- 150+ entrepreneurs (startups worth $50M+ combined)
- 50+ pursuing PhD/research globally

ALUMNI BENEFITS:
- 5% referral scholarship for juniors they refer
- Mentorship programs for current students
- Job referrals through alumni network`,
    tags: ['alumni', 'graduates', 'alumni association', 'notable alumni', 'mentorship', 'network', 'IAS', 'Google']
  }
];

const faqData = [
  {
    question: 'What is the admission process for B.Tech at Poornima University?',
    answer: 'Apply online at poornima.org, submit documents, attend counseling, and pay fees. JEE Main score is preferred but PUAT (Poornima Admission Test) is also accepted. The process runs from March to August.',
    category: 'admissions',
    order: 1
  },
  {
    question: 'What is the annual fee for B.Tech CSE at Poornima University?',
    answer: 'The annual tuition fee for B.Tech CSE (including AI/ML and Data Science) is Rs.1,10,000 per year. Additional charges include examination fee (Rs.3,000), library fee (Rs.2,000), and one-time registration fee (Rs.2,000).',
    category: 'fees',
    order: 2
  },
  {
    question: 'Does Poornima University offer scholarships?',
    answer: 'Yes! Multiple scholarships are available: Vice Chancellor Scholarship (100% waiver for toppers), Merit Scholarships (10-50% based on marks), Government SC/ST/OBC scholarships, Sports scholarships, and need-based financial aid. Contact scholarships@poornima.org.',
    category: 'scholarships',
    order: 3
  },
  {
    question: 'What is the average placement package at Poornima University?',
    answer: 'The average placement package for B.Tech is Rs.5.2 LPA and for MBA is Rs.6.8 LPA. The highest package in 2023-24 was Rs.42 LPA. 90%+ eligible students are placed. 300+ companies visit campus including TCS, Infosys, Amazon, and Wipro.',
    category: 'placements',
    order: 4
  },
  {
    question: 'Is hostel available at Poornima University?',
    answer: 'Yes, both boys and girls hostels are available on campus. Boys hostel capacity is 1500+ and girls hostel is 1000+. Annual fees are Rs.80,000 (boys) and Rs.85,000 (girls), inclusive of mess. WiFi, security, and medical facility are included.',
    category: 'hostel',
    order: 5
  },
  {
    question: 'What courses does Poornima University offer?',
    answer: 'Poornima University offers: B.Tech (10 specializations), MBA, BBA, MCA, BCA, B.Sc, M.Sc, M.Tech, LLB, BA LLB, Diplomas, and PhD programs. Engineering has specializations in AI/ML, Data Science, Cyber Security, CSE, ECE, EE, ME, and CE.',
    category: 'courses',
    order: 6
  },
  {
    question: 'What is the minimum attendance requirement?',
    answer: 'Students must maintain a minimum 75% attendance to be eligible to appear in end-semester examinations. Medical exceptions allow up to 10% reduction with proper documentation.',
    category: 'general',
    order: 7
  },
  {
    question: 'How do I contact Poornima University?',
    answer: 'Main Phone: +91-141-5160400, Toll Free: 1800-300-40404, Admissions: +91-9887051160. Email: info@poornima.org for general queries, admissions@poornima.org for admissions. Website: poornima.org',
    category: 'general',
    order: 8
  },
  {
    question: 'Who is the Vice Chancellor of Poornima University?',
    answer: 'The Vice Chancellor of Poornima University is Prof. (Dr.) Dharmesh Dhabliya. The Chancellor is Sh. Rajeev Jain and the Registrar is Dr. Karunesh Saxena.',
    category: 'general',
    order: 9
  },
  {
    question: 'What labs are available for CSE students?',
    answer: 'CSE students have access to: Programming Lab (60 systems), AI & ML Lab (GPU-enabled), Data Science Lab, Cyber Security Lab (Kali Linux, Metasploit), IoT Lab (Arduino, Raspberry Pi), Cloud Computing Lab (AWS/Azure), DBMS Lab, Mobile App Dev Lab, and Software Testing Lab.',
    category: 'facilities',
    order: 10
  }
];

const noticeData = [
  {
    title: 'Admissions Open 2024-25: Apply Now for B.Tech, MBA, MCA Programs',
    body: 'Poornima University is now accepting applications for the academic year 2024-25. Apply online at poornima.org. Merit-based scholarships available. Last date: July 31, 2024.',
    category: 'admission',
    isPinned: true
  },
  {
    title: 'Campus Placement Drive: TCS, Infosys, Wipro on Campus - August 2024',
    body: 'Final year students are invited for the campus placement drive. Companies: TCS, Infosys, and Wipro will be on campus from August 5-8, 2024. Register at the T&P cell before August 1.',
    category: 'placement',
    isPinned: true
  },
  {
    title: 'End Semester Examinations Schedule Released - November 2024',
    body: 'The examination schedule for November-December 2024 End-Semester Examinations has been released. Check your student portal at erp.poornima.org for your personalized timetable.',
    category: 'exam'
  },
  {
    title: 'Smart India Hackathon 2024 - University Level Round',
    body: 'Poornima University will host the Smart India Hackathon university-level round on September 15, 2024. Teams of 6 students can register. Problem statements will be released on September 1.',
    category: 'event'
  },
  {
    title: 'Scholarship Applications Open - Last Date August 15',
    body: 'Students who have secured 85% or above in Class 12 boards can apply for Poornima University merit scholarships. Submit applications with documents to the scholarship cell before August 15, 2024.',
    category: 'academic'
  },
  {
    title: 'Hostel Allotment 2024-25 - Apply Before July 20',
    body: 'New students seeking hostel accommodation for 2024-25 must apply before July 20, 2024. Apply online at erp.poornima.org. AC rooms available on first-come-first-served basis.',
    category: 'general',
    isPinned: false
  },
  {
    title: 'Technova 2024 - Annual Technical Fest Registrations Open',
    body: 'Register now for Technova 2024 (February 15-17). Events: coding competitions, hackathons, robotics, paper presentations, and guest lectures by industry experts. Register at technova.poornima.org.',
    category: 'event'
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();

    await KnowledgeEntry.deleteMany({});
    await FAQ.deleteMany({});
    await Notice.deleteMany({});

    const adminExists = await User.findOne({ email: 'admin@poornima.org' });
    if (!adminExists) {
      await User.create({
        name: 'PU Admin',
        email: 'admin@poornima.org',
        password: 'Admin@PU2024',
        role: 'admin'
      });
      console.log('Admin user created: admin@poornima.org / Admin@PU2024');
    }

    const demoUserExists = await User.findOne({ email: 'student@poornima.org' });
    if (!demoUserExists) {
      await User.create({
        name: 'Demo Student',
        email: 'student@poornima.org',
        password: 'Student@123',
        role: 'student'
      });
      console.log('Demo student created: student@poornima.org / Student@123');
    }

    await KnowledgeEntry.insertMany(knowledgeData);
    console.log(`${knowledgeData.length} knowledge entries seeded`);

    await FAQ.insertMany(faqData);
    console.log(`${faqData.length} FAQs seeded`);

    await Notice.insertMany(noticeData);
    console.log(`${noticeData.length} notices seeded`);

    console.log('\n✅ Database seeded successfully!');
    console.log('Admin: admin@poornima.org | Password: Admin@PU2024');
    console.log('Student: student@poornima.org | Password: Student@123');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seedDatabase();
