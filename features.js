const EXAMS = [
  {
    id: "jee-main", name: "JEE Main", category: "Engineering", difficulty: "Advanced", duration: "About 3 hours",
    format: "Computer-based test • Physics, Chemistry and Mathematics • recent pattern: 75 questions, 300 marks",
    pattern: [{ label: "Mathematics", value: 33 }, { label: "Physics", value: 33 }, { label: "Chemistry", value: 34 }],
    months: ["Review core concepts", "Build topic-wise accuracy", "Practice timed sections", "Take full mocks"],
    url: "https://jeemain.nta.nic.in/"
  },
  {
    id: "neet-ug", name: "NEET UG", category: "Medical", difficulty: "Advanced", duration: "About 3 hours",
    format: "Pen-and-paper test • Physics, Chemistry, Botany and Zoology • check the current NTA bulletin for question and marking rules",
    pattern: [{ label: "Physics", value: 25 }, { label: "Chemistry", value: 25 }, { label: "Botany", value: 25 }, { label: "Zoology", value: 25 }],
    months: ["Map the NCERT syllabus", "Revise Biology consistently", "Practice Physics and Chemistry", "Full-length mock review"],
    url: "https://neet.nta.nic.in/"
  },
  {
    id: "cat", name: "CAT", category: "Management", difficulty: "Advanced", duration: "About 2 hours",
    format: "Computer-based test • VARC, DILR and Quantitative Ability • section timing and question counts may change each year",
    pattern: [{ label: "VARC", value: 35 }, { label: "DILR", value: 32 }, { label: "Quantitative Ability", value: 33 }],
    months: ["Diagnose your baseline", "Strengthen fundamentals", "Practice timed sets", "Mocks and application prep"],
    url: "https://iimcat.ac.in/"
  },
  {
    id: "upsc-cse", name: "UPSC Civil Services", category: "Civil Services", difficulty: "Advanced", duration: "Multi-stage examination",
    format: "Prelims, Mains and Personality Test • Prelims has General Studies and a qualifying CSAT paper",
    pattern: [{ label: "General Studies", value: 50 }, { label: "CSAT (qualifying)", value: 50 }],
    months: ["Read the syllabus and build a base", "Cover static subjects", "Add current affairs and answer writing", "Revise and take practice tests"],
    url: "https://upsc.gov.in/"
  },
  {
    id: "clat", name: "CLAT UG", category: "Law", difficulty: "Intermediate", duration: "2 hours",
    format: "Reading-based objective test • English, Current Affairs, Legal Reasoning, Logical Reasoning and Quantitative Techniques",
    pattern: [{ label: "English", value: 20 }, { label: "Current Affairs & GK", value: 25 }, { label: "Legal Reasoning", value: 25 }, { label: "Logical Reasoning", value: 20 }, { label: "Quantitative Techniques", value: 10 }],
    months: ["Build reading consistency", "Learn section strategies", "Practice passage-based sets", "Mocks and error-log revision"],
    url: "https://consortiumofnlus.ac.in/"
  },
  {
    id: "ca-foundation", name: "CA Foundation", category: "Commerce", difficulty: "Intermediate", duration: "Four papers across exam days",
    format: "Accounting, Business Laws, Quantitative Aptitude and Business Economics • consult ICAI for current paper and passing rules",
    pattern: [{ label: "Accounting", value: 25 }, { label: "Business Laws", value: 25 }, { label: "Quantitative Aptitude", value: 25 }, { label: "Economics", value: 25 }],
    months: ["Plan paper-wise coverage", "Study concepts and illustrations", "Solve past questions", "Revise and attempt mocks"],
    url: "https://www.icai.org/"
  },
  {
    id: "gate", name: "GATE 2027", category: "Engineering", difficulty: "Advanced", duration: "3 hours",
    format: "Computer-based test • General Aptitude and subject-specific questions • paper structure varies by discipline",
    pattern: [{ label: "General Aptitude", value: 15 }, { label: "Chosen test paper", value: 85 }],
    months: ["Set a subject-wise baseline", "Cover fundamentals", "Solve topic-wise problems", "Mock exams and final revision"],
    url: "https://gate2027.iitm.ac.in/"
  },
  {
    id: "nid-dat", name: "NID DAT", category: "Design", difficulty: "Intermediate", duration: "Varies by stage",
    format: "Design aptitude assessment with written and studio/interview stages as notified • check the current admission handbook",
    pattern: [{ label: "Observation & creativity", value: 35 }, { label: "Visual communication", value: 35 }, { label: "Reasoning", value: 30 }],
    months: ["Observe and sketch daily", "Explore visual storytelling", "Practice timed design prompts", "Build a portfolio and review"],
    url: "https://admissions.nid.edu/"
  },
  {
    id: "cuet-ug", name: "CUET UG", category: "University Admissions", difficulty: "Beginner", duration: "Varies by selected papers",
    format: "Computer-based test • language, domain subjects and general test as required by the target university",
    pattern: [{ label: "Language", value: 33 }, { label: "Domain subjects", value: 47 }, { label: "General test", value: 20 }],
    months: ["Confirm target university subjects", "Revise selected domain syllabi", "Practice language and aptitude", "Take timed paper-wise mocks"],
    url: "https://cuet.nta.nic.in/"
  },
  {
    id: "nda", name: "NDA & NA", category: "Defence", difficulty: "Advanced", duration: "Written test plus later selection stages",
    format: "Mathematics and General Ability Test • SSB and medical standards are separate stages",
    pattern: [{ label: "Mathematics", value: 50 }, { label: "English", value: 25 }, { label: "General Knowledge", value: 25 }],
    months: ["Check age and eligibility criteria", "Build mathematics foundations", "Study English and general knowledge", "Practice tests and interview readiness"],
    url: "https://upsc.gov.in/"
  },
  {
    id: "nift", name: "NIFTEE (NIFT Entrance)", category: "Design", difficulty: "Intermediate", duration: "Varies by programme and stage",
    format: "Programme-specific aptitude and situation tests/interviews as notified • verify the current NIFT admission prospectus",
    pattern: [{ label: "Creative ability", value: 40 }, { label: "Communication", value: 30 }, { label: "Quantitative & reasoning", value: 30 }],
    months: ["Review programme requirements", "Practice drawing and observation", "Develop design problem-solving", "Timed practice and portfolio review"],
    url: "https://www.nift.ac.in/"
  },
  {
    id: "cuet-pg", name: "CUET PG", category: "Postgraduate Admissions", difficulty: "Intermediate", duration: "Varies by paper",
    format: "Computer-based subject-specific entrance test • syllabus and participating institutions vary",
    pattern: [{ label: "Core subject", value: 70 }, { label: "Reasoning", value: 15 }, { label: "Language & aptitude", value: 15 }],
    months: ["Check target university requirements", "Map the subject syllabus", "Practice paper-specific questions", "Mock tests and revision"],
    url: "https://exams.nta.nic.in/cuet-pg/"
  }
];

const EXAM_GUIDES = {
  "jee-main": {
    fullName: "Joint Entrance Examination (Main)",
    body: "National Testing Agency (NTA)",
    eligible: "10+2 or equivalent with the required subjects; NIT+ admission has separate subject and year-of-passing rules.",
    mode: "Computer-based test",
    attempts: "Usually two sessions in a year; eligibility across years follows the current information bulletin.",
    months: "Typically January and April sessions",
    totalMarks: "300 marks in the recent 75-question pattern",
    marking: "+4 correct, −1 incorrect; unanswered questions score 0 in the recent pattern.",
    subjects: [
      { name: "Mathematics", split: 34, topics: [["Algebra and complex numbers", "Medium"], ["Calculus and differential equations", "Hard"], ["Coordinate geometry and vectors", "Hard"]] },
      { name: "Physics", split: 33, topics: [["Mechanics and rotational motion", "Hard"], ["Electrostatics and current electricity", "Medium"], ["Optics and modern physics", "Medium"]] },
      { name: "Chemistry", split: 33, topics: [["Physical chemistry and numericals", "Medium"], ["Organic reaction principles", "Hard"], ["Inorganic chemistry and periodicity", "Medium"]] }
    ],
    resources: ["NCERT Physics, Chemistry and Mathematics (Classes XI–XII)", "NTA Abhyas app and official JEE Main question papers", "Khan Academy India for concept refreshers"],
    mistakes: ["Skipping NCERT and jumping straight to advanced problems", "Taking mocks without reviewing wrong and guessed answers", "Ignoring the current session's question and syllabus bulletin"],
    similar: ["BITSAT", "State engineering entrance tests", "JEE Advanced (separate eligibility and exam)"],
    last30: ["Recheck the current city slip, admit card and exam-day instructions", "Revise formula sheets and NCERT marked sections", "Take timed papers, then review only the highest-impact errors", "Confirm travel, ID documents, permitted items and sleep routine"]
  },
  "neet-ug": {
    fullName: "National Eligibility cum Entrance Test (Undergraduate)",
    body: "National Testing Agency (NTA)",
    eligible: "10+2 or equivalent with required Physics, Chemistry, Biology/Biotechnology and English subjects; category-specific marks and age rules apply.",
    mode: "Pen-and-paper OMR (verify the current bulletin)",
    attempts: "No fixed attempt limit in recent rules; age and eligibility are controlled by the current bulletin.",
    months: "Usually held once yearly, commonly around May",
    totalMarks: "720 marks in the recent 180-question format",
    marking: "+4 correct, −1 incorrect, 0 unanswered in the recent pattern.",
    subjects: [
      { name: "Physics", split: 25, topics: [["Mechanics and properties of matter", "Hard"], ["Electricity, magnetism and circuits", "Medium"], ["Optics and modern physics", "Medium"]] },
      { name: "Chemistry", split: 25, topics: [["Physical chemistry calculations", "Medium"], ["Organic reactions and functional groups", "Hard"], ["Inorganic chemistry from NCERT", "Medium"]] },
      { name: "Botany", split: 25, topics: [["Plant physiology and genetics", "Hard"], ["Cell biology and biomolecules", "Medium"], ["Diversity and ecology", "Medium"]] },
      { name: "Zoology", split: 25, topics: [["Human physiology", "Hard"], ["Reproduction and evolution", "Medium"], ["Animal diversity and health", "Medium"]] }
    ],
    resources: ["NCERT Biology, Physics and Chemistry (Classes XI–XII)", "NTA NEET official information bulletin and previous papers", "NCERT official textbooks and Exemplar problems"],
    mistakes: ["Reading Biology without active recall or diagram practice", "Avoiding Physics numericals until the final weeks", "Using old paper rules without checking the latest NTA bulletin"],
    similar: ["AIIMS admissions through NEET-UG", "JIPMER admissions through NEET-UG", "State medical counselling (NEET score required)"],
    last30: ["Revise NCERT Biology line-by-line with diagrams", "Practice OMR bubbling and a full-length timed paper", "Review error log and high-yield Physics formulas", "Verify admit card, reporting time, ID and OMR instructions"]
  },
  cat: {
    fullName: "Common Admission Test",
    body: "Indian Institutes of Management (rotating convening IIM)",
    eligible: "Bachelor's degree with minimum marks set by the current notice; final-year students may apply subject to proof requirements.",
    mode: "Computer-based test",
    attempts: "Once per annual cycle; no lifetime attempt cap is generally stated.",
    months: "Usually November",
    totalMarks: "Varies by year and question paper; check the CAT notification.",
    marking: "Recent pattern awards marks for correct answers; MCQs typically have a penalty while non-MCQs do not. Verify yearly rules.",
    subjects: [
      { name: "VARC", split: 34, topics: [["Reading comprehension and inference", "Hard"], ["Para summaries and sentence placement", "Medium"], ["Vocabulary in context", "Medium"]] },
      { name: "DILR", split: 33, topics: [["Arrangement and grouping sets", "Hard"], ["Tables, charts and data interpretation", "Medium"], ["Logical games and caselets", "Hard"]] },
      { name: "Quantitative Ability", split: 33, topics: [["Arithmetic: ratios, averages and percentages", "Medium"], ["Algebra and equations", "Hard"], ["Geometry, number systems and modern math", "Hard"]] }
    ],
    resources: ["Official CAT practice test and prior question papers", "Arun Sharma, How to Prepare for Quantitative Aptitude for CAT", "Aeon Essays for sustained reading practice"],
    mistakes: ["Attempting every question instead of selecting good sets", "Practising speed without reviewing the reasoning", "Ignoring sectional time and mock percentile trends"],
    similar: ["XAT", "CMAT", "NMAT"],
    last30: ["Take full mocks under the current section timing", "Review every mock and classify errors by concept and choice", "Practise VARC reading and one DILR set daily", "Check test-centre details and allowed ID documents"]
  },
  "upsc-cse": {
    fullName: "Civil Services Examination",
    body: "Union Public Service Commission (UPSC)",
    eligible: "A recognized bachelor's degree; age limits, relaxations and service-specific conditions depend on category and notification.",
    mode: "Offline written Prelims and Mains; Personality Test is in person/otherwise as notified",
    attempts: "Category-dependent attempt limits and age rules; check the current annual notification.",
    months: "Prelims commonly around May–June; Mains later in the year (dates vary)",
    totalMarks: "Mains merit papers 1,750 marks + Personality Test 275; Prelims is screening and not added to final rank.",
    marking: "Prelims GS-I has negative marking for wrong answers; CSAT is qualifying. Mains uses descriptive answers.",
    subjects: [
      { name: "General Studies", split: 40, topics: [["Polity, governance and social justice", "Medium"], ["Economy and development", "Hard"], ["Environment, science and security", "Hard"]] },
      { name: "History and Culture", split: 20, topics: [["Modern India and freedom struggle", "Medium"], ["Ancient and medieval foundations", "Hard"], ["Art, culture and heritage", "Medium"]] },
      { name: "Geography", split: 20, topics: [["Physical geography and climatology", "Hard"], ["Indian resources and agriculture", "Medium"], ["Maps and places in current affairs", "Medium"]] },
      { name: "CSAT", split: 20, topics: [["Reading comprehension", "Medium"], ["Numeracy and data interpretation", "Medium"], ["Logical reasoning and decision-making", "Hard"]] }
    ],
    resources: ["UPSC official syllabus, previous papers and annual notification", "NCERT textbooks for history, geography, polity and economy foundations", "Sansad TV for parliamentary and policy context"],
    mistakes: ["Collecting too many sources instead of revising a small set", "Neglecting CSAT because it is qualifying", "Writing notes without practising timed answers"],
    similar: ["State Public Service Commission exams", "Indian Forest Service (shared Prelims; separate stages)", "CAPF (Assistant Commandants)"],
    last30: ["Use the official syllabus and previous papers to prioritize revision", "Attempt timed GS and CSAT papers and review negative marks", "Revise maps, short notes and current-affairs links", "Confirm admit card, centre, photo ID and exam-day rules"]
  },
  clat: {
    fullName: "Common Law Admission Test (Undergraduate)",
    body: "Consortium of National Law Universities",
    eligible: "Class 12 or equivalent; minimum marks and age criteria follow the current CLAT-UG admission notification.",
    mode: "Offline OMR-based test in recent cycles",
    attempts: "One annual cycle; no general lifetime attempt limit.",
    months: "Usually December (the calendar can change)",
    totalMarks: "120 marks in the recent 120-question format",
    marking: "+1 correct and −0.25 incorrect in the recent pattern; verify the current paper.",
    subjects: [
      { name: "English Language", split: 22, topics: [["Comprehension and central idea", "Medium"], ["Inference, tone and vocabulary", "Medium"], ["Argument structure", "Hard"]] },
      { name: "Current Affairs & General Knowledge", split: 24, topics: [["National and international events", "Medium"], ["Government policy and institutions", "Medium"], ["Awards, reports and significant developments", "Hard"]] },
      { name: "Legal Reasoning", split: 24, topics: [["Apply a stated principle to facts", "Medium"], ["Constitutional and legal current affairs", "Hard"], ["Careful passage-based reasoning", "Hard"]] },
      { name: "Logical Reasoning", split: 20, topics: [["Critical reasoning and assumptions", "Hard"], ["Identify arguments and conclusions", "Medium"], ["Passage-based logical reasoning", "Hard"]] },
      { name: "Quantitative Techniques", split: 10, topics: [["Short quantitative passages and data", "Medium"], ["Basic arithmetic and interpretation", "Medium"], ["Tables, graphs and proportional reasoning", "Easy"]] }
    ],
    resources: ["Consortium's official syllabus, sample papers and prior papers", "The Hindu or Indian Express for daily current-affairs reading", "NCERT Class 10 mathematics for quantitative foundations"],
    mistakes: ["Preparing legal provisions by rote instead of applying the passage principle", "Reading current affairs without monthly revision", "Spending too long on a difficult passage"],
    similar: ["AILET", "SLAT", "MH CET Law"],
    last30: ["Complete timed passage sets and at least a few full mocks", "Revise monthly current-affairs notes and legal developments", "Practise OMR pacing and skip/return decisions", "Check Consortium instructions, admit card and permitted items"]
  },
  "ca-foundation": {
    fullName: "Chartered Accountancy Foundation Examination",
    body: "Institute of Chartered Accountants of India (ICAI)",
    eligible: "Class 12 passed/appearing or the applicable ICAI registration route; registration deadlines and rules apply.",
    mode: "Offline written papers; objective-paper arrangements follow the current scheme",
    attempts: "Exam sessions are notified by ICAI; eligible candidates may sit in later sessions after registration.",
    months: "ICAI-notified sessions, commonly in the middle and end of the year",
    totalMarks: "400 total across four papers (100 each) in the current scheme",
    marking: "Paper-specific rules; objective papers may have negative marking. Passing rules are subject to ICAI regulations.",
    subjects: [
      { name: "Accounting", split: 30, topics: [["Journal, ledger and trial balance", "Medium"], ["Depreciation, inventory and final accounts", "Hard"], ["Partnership accounts and financial statements", "Hard"]] },
      { name: "Business Laws", split: 25, topics: [["Contract Act concepts and application", "Hard"], ["Sale of Goods and negotiable instruments", "Medium"], ["Company and other applicable laws", "Medium"]] },
      { name: "Quantitative Aptitude", split: 25, topics: [["Ratio, equations and mathematics", "Medium"], ["Statistics and data interpretation", "Hard"], ["Logical reasoning", "Medium"]] },
      { name: "Business Economics", split: 20, topics: [["Demand, supply and markets", "Medium"], ["Production and cost", "Medium"], ["National income and economic policy", "Hard"]] }
    ],
    resources: ["ICAI BoS study material, RTPs, MTPs and previous question papers", "ICAI BoS Knowledge Portal and student announcements", "NCERT introductory economics for concept refreshers"],
    mistakes: ["Solving accounts without showing working notes", "Memorising law answers without applying provisions to facts", "Ignoring ICAI amendments and the attempt-specific study material"],
    similar: ["CMA Foundation", "CS Executive Entrance Test (CSEET)", "CUET-UG commerce programmes"],
    last30: ["Use the ICAI material applicable to your exam attempt", "Practise full papers and review presentation and working notes", "Revise law provisions and objective-question error log", "Verify paper schedule, registration status and exam-centre instructions"]
  },
  gate: {
    fullName: "Graduate Aptitude Test in Engineering",
    body: "Organizing Institute for the GATE cycle, on behalf of the NCB-GATE",
    eligible: "Students in the third year or higher of an eligible undergraduate programme, graduates, and specified equivalent qualifications.",
    mode: "Computer-based test",
    attempts: "Usually once annually; no general lifetime cap.",
    months: "GATE 2027 is scheduled for February 6–7 and 13–14, 2027; check the official notice for updates.",
    totalMarks: "100 marks; paper structure includes General Aptitude and the selected test paper.",
    marking: "Negative marks apply to some MCQs; no negative marks for MSQ/NAT in the published pattern. Check the paper-specific brochure.",
    subjects: [
      { name: "General Aptitude", split: 15, topics: [["Verbal ability and grammar", "Medium"], ["Numerical aptitude", "Medium"], ["Logical and spatial reasoning", "Medium"]] },
      { name: "Chosen test paper", split: 85, topics: [["Review the selected paper's official syllabus", "Medium"], ["Practise paper-specific fundamentals and applications", "Hard"], ["Solve previous-paper questions for the selected code", "Medium"]] }
    ],
    resources: ["Official GATE paper syllabus, sample tests and previous papers", "NPTEL courses from IITs and IISc", "Standard undergraduate textbooks listed by your paper syllabus"],
    mistakes: ["Following a generic syllabus rather than the selected paper's syllabus", "Memorising formulas without practising multi-step problems", "Ignoring MSQ/NAT format and negative-mark distinctions"],
    similar: ["ESE/Engineering Services Examination", "ISRO/DRDO recruitment tests (when eligible)", "PG admission tests for engineering and science"],
    last30: ["Finish one timed paper per week, then analyze topic-level errors", "Revise formula sheets and high-frequency core concepts", "Practise the exact MCQ/MSQ/NAT interface and time allocation", "Check GOAPS details, paper code, admit card and allowed calculator rules"]
  },
  "nid-dat": {
    fullName: "National Institute of Design – Design Aptitude Test",
    body: "National Institute of Design (NID)",
    eligible: "Applicants meeting the programme-specific age, education and category rules in the current admission handbook.",
    mode: "DAT Prelims and, if shortlisted, DAT Mains/studio tasks as notified",
    attempts: "One admission cycle per year; eligibility by age/category is cycle-specific.",
    months: "Prelims often around December–January; verify the admission calendar",
    totalMarks: "Stage-wise and programme-specific; no single fixed total applies to every cycle.",
    marking: "Question types and stage weightage are announced in the current handbook.",
    subjects: [
      { name: "Observation & Visualisation", split: 35, topics: [["Object, form and spatial observation", "Medium"], ["Perspective and proportion sketches", "Medium"], ["Visual memory exercises", "Hard"]] },
      { name: "Creative Problem Solving", split: 35, topics: [["Idea generation from a brief", "Hard"], ["Storyboarding and visual narrative", "Medium"], ["Material and user-aware solutions", "Hard"]] },
      { name: "Reasoning & Communication", split: 30, topics: [["Visual and logical reasoning", "Medium"], ["Design awareness and context", "Medium"], ["Clear written explanation", "Easy"]] }
    ],
    resources: ["NID admissions portal: handbook, sample papers and past papers", "National Gallery of Modern Art and museum collections for observation", "Daily sketchbook prompts using ordinary objects and public spaces"],
    mistakes: ["Copying styles instead of developing original ideas", "Practising only drawing while ignoring reasoning and explanation", "Ignoring time, materials and the constraints in a design brief"],
    similar: ["UCEED", "NIFTEE (NIFT Entrance)", "MIT Institute of Design DAT"],
    last30: ["Do timed sketch and design prompts from varied briefs", "Review the official stage format and required materials", "Practise explaining the user, idea and constraints behind each solution", "Prepare portfolio/work samples only if the current stage requests them"]
  },
  "cuet-ug": {
    fullName: "Common University Entrance Test (Undergraduate)",
    body: "National Testing Agency (NTA)",
    eligible: "Class 12 passed/appearing; programme prerequisites and subject combinations are set by each participating university.",
    mode: "Computer-based test",
    attempts: "One annual cycle; no general lifetime cap, subject to university admission rules.",
    months: "Usually May–June",
    totalMarks: "Varies by chosen papers; recent domain papers used 250-mark formats. Check the current bulletin.",
    marking: "Recent pattern: +5 correct, −1 incorrect, 0 unanswered; verify paper-specific rules.",
    subjects: [
      { name: "Language paper(s)", split: 25, topics: [["Reading comprehension", "Medium"], ["Vocabulary and verbal ability", "Easy"], ["Language-specific syllabus practice", "Medium"]] },
      { name: "Selected domain subjects", split: 55, topics: [["Class XII subject syllabus and NCERT concepts", "Medium"], ["Application and data-based questions", "Hard"], ["Textbook details and practical concepts", "Medium"]] },
      { name: "General Test (if required)", split: 20, topics: [["General knowledge and current affairs", "Medium"], ["Quantitative aptitude", "Medium"], ["Logical reasoning", "Easy"]] }
    ],
    resources: ["NTA CUET-UG bulletin and official syllabus by paper code", "NCERT Class XII textbooks for selected domains", "Target universities' official programme eligibility pages"],
    mistakes: ["Choosing papers before checking university course prerequisites", "Preparing every subject rather than the papers actually needed", "Assuming one CUET score guarantees admission at every university"],
    similar: ["University-specific entrance tests", "State university admission tests", "CUET-PG (for postgraduate applicants)"],
    last30: ["Confirm each target course's subject and score requirements", "Revise only selected paper-code syllabi and take timed practice", "Practise the computer interface and current marking scheme", "Check city slip, admit card and university counselling dates"]
  },
  nda: {
    fullName: "National Defence Academy and Naval Academy Examination",
    body: "Union Public Service Commission (UPSC)",
    eligible: "Unmarried candidates meeting the notification's age, nationality and education rules; Air Force/Naval wings require specified 10+2 subjects.",
    mode: "Offline written examination followed by SSB interview and medical assessment",
    attempts: "No separate attempt count; the narrow age window and eligibility determine attempts.",
    months: "Usually two cycles, commonly April and September",
    totalMarks: "Written papers: Mathematics 300 + GAT 600; SSB: 900 marks.",
    marking: "Objective papers have negative marks for incorrect answers; paper-specific values appear in the UPSC notice.",
    subjects: [
      { name: "Mathematics", split: 40, topics: [["Algebra, matrices and determinants", "Hard"], ["Trigonometry and analytical geometry", "Medium"], ["Calculus, vectors and statistics", "Hard"]] },
      { name: "English", split: 25, topics: [["Grammar and usage", "Medium"], ["Vocabulary and comprehension", "Medium"], ["Sentence structure and cohesion", "Easy"]] },
      { name: "General Knowledge", split: 35, topics: [["Physics, chemistry and general science", "Medium"], ["History, geography and society", "Medium"], ["Current affairs and defence awareness", "Hard"]] }
    ],
    resources: ["UPSC NDA notice, syllabus and previous question papers", "NCERT Classes IX–XII for science, mathematics, history and geography", "Official Indian Air Force and Indian Navy career pages for role context"],
    mistakes: ["Preparing written papers but overlooking SSB communication and teamwork", "Not checking the exact age window before investing in preparation", "Neglecting English and general science within GAT"],
    similar: ["TES entry (Army; separate eligibility)", "Indian Navy 10+2 B.Tech entry (as notified)", "AFCAT (different age/education route)"],
    last30: ["Take timed Mathematics and GAT papers and analyze errors", "Review current affairs, formulas and English usage", "Check age, educational eligibility and service preferences against the notice", "Prepare documents and review SSB process without treating it as a written mock"]
  },
  nift: {
    fullName: "National Institute of Fashion Technology Entrance Examination",
    body: "National Institute of Fashion Technology (NIFT)",
    eligible: "Programme-specific 10+2 or bachelor's qualification and age rules; check the current admission prospectus.",
    mode: "Computer-based/pen-paper stages and situation test/interview vary by programme and year",
    attempts: "One admission cycle annually; age and programme rules apply.",
    months: "Often January–February; dates vary by cycle",
    totalMarks: "Programme and stage dependent; no single total applies across all programmes.",
    marking: "Test structure and stage weightage are published in the annual prospectus.",
    subjects: [
      { name: "Creative Ability", split: 35, topics: [["Observation and object drawing", "Medium"], ["Colour, composition and storytelling", "Hard"], ["Creative response to a design brief", "Hard"]] },
      { name: "General Ability Test", split: 35, topics: [["Quantitative ability and data", "Medium"], ["Communication and English", "Medium"], ["General knowledge and current affairs", "Easy"]] },
      { name: "Situation/Programme-specific Test", split: 30, topics: [["Material use and spatial composition", "Medium"], ["User-focused product thinking", "Hard"], ["Programme-specific portfolio/interview if required", "Medium"]] }
    ],
    resources: ["NIFT admissions portal and current programme prospectus", "NIFT official sample papers and previous papers where published", "Fashion and textile collections at museums for visual research"],
    mistakes: ["Preparing for one programme without checking its exact test stages", "Practising drawing but not quantitative and communication sections", "Rushing a situation task without planning material and composition"],
    similar: ["NID DAT", "UCEED", "Pearl Academy entrance (separate process)"],
    last30: ["Confirm programme-wise stages, weights and eligibility", "Practise timed creative briefs and GAT sections", "Build a small visual research notebook and review mistakes", "Check admit card, test centre, materials and interview/situation-test directions"]
  },
  "cuet-pg": {
    fullName: "Common University Entrance Test (Postgraduate)",
    body: "National Testing Agency (NTA)",
    eligible: "Bachelor's degree or equivalent; each participating university defines subject prerequisites and admission eligibility.",
    mode: "Computer-based test",
    attempts: "One annual cycle; no general lifetime cap, subject to programme rules.",
    months: "Usually March–April (varies by cycle)",
    totalMarks: "Paper-code dependent; recent papers commonly use 75 questions and 300 marks.",
    marking: "Recent pattern commonly +4 correct, −1 incorrect; confirm the current bulletin and paper code.",
    subjects: [
      { name: "Core subject paper", split: 70, topics: [["Undergraduate major foundations", "Medium"], ["Advanced core theories and applications", "Hard"], ["Research methods or domain tools where relevant", "Hard"]] },
      { name: "Reasoning & Quantitative Skills", split: 15, topics: [["Logical reasoning and analytical interpretation", "Medium"], ["Quantitative aptitude", "Medium"], ["Data interpretation", "Easy"]] },
      { name: "Language/Aptitude (where applicable)", split: 15, topics: [["Reading comprehension", "Medium"], ["Verbal ability", "Easy"], ["General aptitude", "Medium"]] }
    ],
    resources: ["NTA CUET-PG bulletin and subject-code syllabus", "Target university department pages and previous papers", "Core undergraduate textbooks for the chosen discipline"],
    mistakes: ["Preparing a generic subject rather than the exact paper code", "Overlooking each university's separate eligibility and counselling process", "Skipping foundational undergraduate topics in favour of advanced references"],
    similar: ["University-specific master's entrance tests", "GATE (for eligible technical/science programmes)", "TISS and other institution-specific tests where applicable"],
    last30: ["Map the paper-code syllabus against undergraduate notes", "Complete timed papers and review the marking rules", "Check target university prerequisites and application dates", "Verify paper code, admit card, centre and exam interface"]
  }
};

const EXTRA_CHART_COLORS = ["#FF886F", "#48BFA9", "#B77CE8"];
const MOOD_LABELS = ["Very low", "Uneasy", "Okay", "Good", "Great"];
const MOOD_RESPONSES = [
  "That sounds like a hard moment. If it feels manageable, consider letting someone you trust know you could use some company.",
  "Uneasy days happen. You could take one small pause, or share what's on your mind with someone you trust.",
  "Thanks for checking in. A slow breath or a short stretch might be a gentle next step.",
  "Glad things feel good right now. You might take a moment to notice what has been helping.",
  "It's lovely to notice a bright moment. You could write down what made it feel good or share it with someone."
];
let breathingInterval = null;
let breathingStartedAt = 0;

function htmlEscape(value) {
  return String(value == null ? "" : value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);
}

function switchAppPage(page, button) {
  document.querySelectorAll("[data-app-page]").forEach(section => {
    section.hidden = section.dataset.appPage !== page;
  });
  document.querySelectorAll(".app-page-btn").forEach(tab => {
    const active = tab.dataset.page === page;
    tab.classList.toggle("active", active);
    tab.setAttribute("aria-selected", String(active));
  });
  if (button) button.focus({ preventScroll: true });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function exitQuickly() {
  window.location.replace("https://www.google.com/");
}

function initializeFeaturePages() {
  initializeTheme();
  initializeScrollReveal();
  document.querySelectorAll(".real-world-photo img").forEach(image => {
    const hideUnavailableImage = () => {
      image.hidden = true;
      image.closest(".real-world-photo").classList.add("image-unavailable");
    };
    image.addEventListener("error", hideUnavailableImage, { once: true });
    if (image.complete && image.naturalWidth === 0) hideUnavailableImage();
  });
  const categories = [...new Set(EXAMS.map(exam => exam.category))].sort();
  const categoryFilter = document.getElementById("examCategoryFilter");
  const planSelect = document.getElementById("studyPlanExam");
  categories.forEach(category => categoryFilter.add(new Option(category, category)));
  planSelect.add(new Option("Choose an exam...", ""));
  EXAMS.forEach(exam => planSelect.add(new Option(exam.name, exam.id)));
  renderExamCards();
  restoreStudyPlanPreferences();
  renderMoodHistory();
  renderPeerFeed();
  updatePeerCount();
}

window.addEventListener("careercompass:account-ready", restoreStudyPlanPreferences);

function getChartColors() {
  const styles = getComputedStyle(document.documentElement);
  return [
    styles.getPropertyValue("--brass").trim(),
    styles.getPropertyValue("--teal").trim(),
    ...EXTRA_CHART_COLORS
  ];
}

function initializeTheme() {
  let savedTheme = "light";
  try {
    savedTheme = localStorage.getItem("careercompass_theme") || "light";
  } catch (error) {
    console.warn("Could not read the saved theme preference:", error);
  }
  setTheme(savedTheme === "dark" ? "dark" : "light", false);
}

function setTheme(theme, persist = true) {
  const isDark = theme === "dark";
  document.documentElement.dataset.theme = isDark ? "dark" : "light";
  const toggle = document.getElementById("themeToggle");
  toggle.textContent = isDark ? "☀️ Light mode" : "🌙 Dark mode";
  toggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
  toggle.setAttribute("aria-pressed", String(isDark));
  if (persist) {
    try {
      localStorage.setItem("careercompass_theme", isDark ? "dark" : "light");
    } catch (error) {
      console.warn("Could not save the theme preference:", error);
    }
  }
  document.dispatchEvent(new CustomEvent("careercompass:themechange"));
}

function toggleTheme() {
  setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
}

function initializeScrollReveal() {
  const targets = document.querySelectorAll(".panel, .real-world-photo, .feature-hero, .chart-panel");
  targets.forEach(target => target.classList.add("scroll-reveal"));
  if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    targets.forEach(target => target.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -36px 0px" });
  targets.forEach(target => observer.observe(target));
}

function renderExamCards() {
  const category = document.getElementById("examCategoryFilter").value;
  const difficulty = document.getElementById("examDifficultyFilter").value;
  const exams = EXAMS.filter(exam =>
    (category === "all" || exam.category === category) &&
    (difficulty === "all" || exam.difficulty === difficulty)
  );
  const container = document.getElementById("examCards");
  container.innerHTML = exams.length ? exams.map(exam => `
    <button type="button" class="exam-card" data-exam-id="${htmlEscape(exam.id)}" onclick="showExamDetail('${htmlEscape(exam.id)}')">
      <span class="exam-category">${htmlEscape(exam.category)} · ${htmlEscape(exam.difficulty)}</span>
      <strong>${htmlEscape(exam.name)}</strong>
      <small>${htmlEscape(exam.duration)}</small>
    </button>
  `).join("") : '<p class="empty-state">No exams match both filters.</p>';
}

function showExamDetail(examId) {
  const exam = EXAMS.find(item => item.id === examId);
  if (!exam) return;
  const guide = EXAM_GUIDES[exam.id];
  if (!guide) {
    console.error(`No exam guide data is available for ${exam.id}.`);
    return;
  }
  const colors = getChartColors();
  document.querySelectorAll(".exam-card").forEach(card => card.classList.toggle("selected", card.dataset.examId === examId));
  const totalSplit = guide.subjects.reduce((sum, subject) => sum + subject.split, 0);
  let splitStart = 0;
  const splitSegments = guide.subjects.map((subject, index) => {
    const end = splitStart + subject.split / totalSplit * 100;
    const segment = `${colors[index % colors.length]} ${splitStart}% ${end}%`;
    splitStart = end;
    return segment;
  });
  const topicGroups = guide.subjects.map((subject, index) => `
    <details class="syllabus-subject" ${index === 0 ? "open" : ""}>
      <summary><span><i class="subject-dot" style="--subject-color:${colors[index % colors.length]}"></i>${htmlEscape(subject.name)}</span><span class="subject-split">${subject.split}% study-time guide</span></summary>
      <div class="syllabus-topic-list">${subject.topics.map(([topic, difficulty]) => `
        <div class="syllabus-topic"><span>${htmlEscape(topic)}</span><span class="difficulty-tag difficulty-${difficulty.toLowerCase()}">${htmlEscape(difficulty)}</span></div>
      `).join("")}</div>
    </details>
  `).join("");
  const resourceItems = guide.resources.map(item => `<li>${htmlEscape(item)}</li>`).join("") +
    `<li><a href="${htmlEscape(exam.url)}" target="_blank" rel="noopener noreferrer">Official syllabus, previous papers and current notices</a></li>`;
  const mistakeItems = guide.mistakes.map(item => `<li>${htmlEscape(item)}</li>`).join("");
  const similarExams = guide.similar.map(name => {
    const match = EXAMS.find(candidate => candidate.name === name);
    return match
      ? `<button type="button" class="related-exam-link" onclick="showExamDetail('${match.id}')">${htmlEscape(name)} ↗</button>`
      : `<span class="related-exam-label">${htmlEscape(name)}</span>`;
  }).join("");
  const infoItems = [
    ["Conducting body", guide.body],
    ["Who can apply", guide.eligible],
    ["Mode", guide.mode],
    ["Attempts", guide.attempts],
    ["Typical exam window", guide.months],
    ["Duration", exam.duration],
    ["Total marks", guide.totalMarks],
    ["Marking scheme", guide.marking]
  ];
  document.getElementById("examDetail").innerHTML = `
    <article class="exam-detail-card exam-overview-card">
      <div class="exam-overview-head">
        <div><span class="mono-label">${htmlEscape(exam.category)} · ${htmlEscape(exam.name)} GUIDE</span><h3>${htmlEscape(guide.fullName)}</h3><p>${htmlEscape(exam.format)}</p></div>
        <a class="official-exam-link" href="${htmlEscape(exam.url)}" target="_blank" rel="noopener noreferrer">Official website ↗</a>
      </div>
      <div class="exam-quick-chips"><span>${htmlEscape(exam.duration)}</span><span>${htmlEscape(guide.mode.split(" ")[0])}</span><span>${htmlEscape(guide.months)}</span><span>${htmlEscape(guide.totalMarks)}</span></div>
      <dl class="exam-facts">${infoItems.map(([label, value]) => `<div><dt>${htmlEscape(label)}</dt><dd>${htmlEscape(value)}</dd></div>`).join("")}</dl>
      <p class="exam-caution">Verify dates and details on the official website. Eligibility, exam format, marks and attempts can change by year, category, paper and institution.</p>
    </article>
    <section class="exam-guide-section syllabus-section">
      <div class="exam-section-heading"><div><span class="mono-label">WHAT TO STUDY</span><h3>Syllabus breakdown</h3></div><span class="feature-caption">Difficulty is a study guide, not an official rating</span></div>
      <div class="syllabus-layout"><div class="syllabus-accordions">${topicGroups}</div>
        <aside class="subject-time-card"><span class="mono-label">SUGGESTED STUDY-TIME SPLIT</span><div class="study-time-donut" role="img" aria-label="Suggested study-time split by subject" style="--study-split:conic-gradient(${splitSegments.join(",")})"><span>Study<br>time</span></div><div class="pattern-legend">${guide.subjects.map((subject, index) => `<span><span><i style="background:${colors[index % colors.length]}"></i>${htmlEscape(subject.name)}</span><strong>${subject.split}%</strong></span>`).join("")}</div><p class="feature-caption">Planning aid only; not official question weightage.</p></aside>
      </div>
    </section>
    <section class="exam-guide-section">
      <div class="exam-section-heading"><div><span class="mono-label">USEFUL NEXT STEPS</span><h3>Study resources &amp; exam strategy</h3></div></div>
      <div class="exam-help-grid">
        <article class="exam-help-card"><h4>📚 Recommended books &amp; free resources</h4><ul>${resourceItems}</ul></article>
        <article class="exam-help-card"><h4>⚠️ Common mistakes to avoid</h4><ul>${mistakeItems}</ul></article>
      </div>
      <article class="exam-help-card related-exams-card"><h4>↗ Similar exams to explore</h4><div class="related-exams">${similarExams}</div></article>
    </section>`;
}

async function recommendExams() {
  const interests = document.getElementById("examInterests").value.trim();
  const strengths = document.getElementById("examStrengths").value.trim();
  const output = document.getElementById("examRecommendation");
  const button = document.querySelector("#exams-page .feature-button");
  if (!interests && !strengths) {
    output.textContent = "Add at least one interest or subject strength so the recommender has something to work with.";
    return;
  }
  button.disabled = true;
  output.textContent = "Thinking through your interests and strengths…";
  const names = EXAMS.map(exam => exam.name).join(", ");
  const prompt = `You are a careful education guidance assistant. Recommend up to three options ONLY from this list: ${names}. Student interests: ${interests || "not specified"}. Subject strengths: ${strengths || "not specified"}. Return JSON only in this shape: {"recommendations":[{"exam":"exact name from list","reason":"one concise reason tied to the student's input","consider":"one eligibility or preparation consideration"}]}. Do not claim eligibility or guarantee admission.`;
  try {
    const response = await fetch("/api/generate-careers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, apiKey: localStorage.getItem("careercompass_custom_api_key") || undefined })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || `Server returned status ${response.status}`);
    const json = data.text.match(/\{[\s\S]*\}/);
    if (!json) throw new Error("The recommendation service returned an unreadable response. Please try again.");
    const parsed = JSON.parse(json[0]);
    const valid = Array.isArray(parsed.recommendations) ? parsed.recommendations.filter(item =>
      EXAMS.some(exam => exam.name === item.exam) && item.reason
    ).slice(0, 3) : [];
    if (!valid.length) throw new Error("The recommendation service did not return a usable exam suggestion. Please try again.");
    output.innerHTML = `<strong>Ideas to explore</strong><ul>${valid.map(item => {
      const exam = EXAMS.find(candidate => candidate.name === item.exam);
      return `<li><button class="text-link-btn" type="button" onclick="showExamDetail('${htmlEscape(exam.id)}')">${htmlEscape(item.exam)}</button> — ${htmlEscape(item.reason)}${item.consider ? ` <span class="feature-caption">Consider: ${htmlEscape(item.consider)}</span>` : ""}</li>`;
    }).join("")}</ul><p class="support-note">These are starting points, not an eligibility determination. Check official criteria.</p>`;
  } catch (error) {
    console.error("Exam recommendation failed:", error);
    output.textContent = `Could not get recommendations: ${error.message}`;
  } finally {
    button.disabled = false;
  }
}

const STUDY_PLAN_PREFERENCES_KEY = "careercompass_study_plan_preferences";

function studyPlanStorageKey(examId) {
  return `careercompass_study_plan_${examId}`;
}

function readStudyPlanState(examId) {
  const saved = localStorage.getItem(studyPlanStorageKey(examId));
  if (!saved) return { completedMonths: [], completedLast30: [], activityDates: [] };
  const parsed = JSON.parse(saved);
  if (Array.isArray(parsed)) {
    return { completedMonths: parsed.filter(Number.isInteger), completedLast30: [], activityDates: [] };
  }
  if (!parsed || typeof parsed !== "object") throw new Error("Saved study plan has an invalid format.");
  return {
    completedMonths: Array.isArray(parsed.completedMonths) ? parsed.completedMonths.filter(Number.isInteger) : [],
    completedLast30: Array.isArray(parsed.completedLast30) ? parsed.completedLast30.filter(Number.isInteger) : [],
    activityDates: Array.isArray(parsed.activityDates) ? parsed.activityDates.filter(date => typeof date === "string") : []
  };
}

function saveStudyPlanState(examId, state) {
  localStorage.setItem(studyPlanStorageKey(examId), JSON.stringify(state));
}

function restoreStudyPlanPreferences() {
  try {
    const saved = JSON.parse(localStorage.getItem(STUDY_PLAN_PREFERENCES_KEY) || "null");
    if (!saved || !EXAMS.some(exam => exam.id === saved.examId)) return;
    document.getElementById("studyPlanExam").value = saved.examId;
    document.getElementById("studyDuration").value = [3, 6, 9, 12].includes(Number(saved.duration)) ? String(saved.duration) : "12";
    document.getElementById("dailyStudyHours").value = Number.isInteger(saved.dailyHours) && saved.dailyHours >= 1 && saved.dailyHours <= 16 ? String(saved.dailyHours) : "3";
    generateStudyPlan();
  } catch (error) {
    console.error("Could not restore saved study-plan preferences:", error);
  }
}

function saveStudyPlanPreferences(examId, duration, dailyHours) {
  try {
    localStorage.setItem(STUDY_PLAN_PREFERENCES_KEY, JSON.stringify({ examId, duration, dailyHours }));
  } catch (error) {
    console.error("Could not save study-plan preferences:", error);
    throw error;
  }
}

function getStudyPhase(progress) {
  if (progress < 0.25) return { key: "foundation", icon: "🌱", name: "Foundation", task: "Learn the fundamentals and map the syllabus.", milestone: "Take a short baseline quiz and note three topics to strengthen." };
  if (progress < 0.55) return { key: "practice", icon: "🧩", name: "Practice", task: "Work through focused topic sets and build accuracy.", milestone: "Complete a timed sectional set and review every error." };
  if (progress < 0.78) return { key: "revision", icon: "🔁", name: "Revision", task: "Use active recall and spaced revision to close gaps.", milestone: "Revisit your error log and retest two weak areas." };
  return { key: "mocks", icon: "🎯", name: "Mock tests", task: "Practise exam pacing and strengthen final recall.", milestone: "Sit a timed mock or full-length paper and analyze it." };
}

function getMonthTopics(guide, monthIndex) {
  const subjects = guide.subjects;
  const primary = subjects[monthIndex % subjects.length];
  const secondary = subjects[(monthIndex + 1) % subjects.length];
  const primaryTopic = primary.topics[Math.floor(monthIndex / subjects.length) % primary.topics.length][0];
  const secondaryTopic = secondary.topics[(monthIndex + 1) % secondary.topics.length][0];
  return [primaryTopic, secondaryTopic];
}

function createMonthPlan(exam, monthIndex, duration, dailyHours) {
  const guide = EXAM_GUIDES[exam.id];
  const phase = getStudyPhase((monthIndex + 0.5) / duration);
  const topics = getMonthTopics(guide, monthIndex);
  const tips = [
    "Use active recall before rereading your notes.",
    "Keep an error log; write why each answer went wrong.",
    "Study in focused blocks and take short breaks between them.",
    "Review this week's topics once more before moving on."
  ];
  return {
    phase,
    monthLabel: phase.name,
    topics,
    weeklyHours: dailyHours * 6,
    task: `${phase.task} Cover ${topics[0]} and ${topics[1]} using the official syllabus as your checklist.`,
    milestone: phase.milestone,
    tip: tips[monthIndex % tips.length]
  };
}

function formatStreakMessage(activityDates) {
  const uniqueDates = [...new Set(activityDates)].sort().reverse();
  if (!uniqueDates.length) return "Your first check-in starts a streak. Small steps count.";
  const today = new Date();
  const todayKey = [today.getFullYear(), String(today.getMonth() + 1).padStart(2, "0"), String(today.getDate()).padStart(2, "0")].join("-");
  const yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);
  const yesterdayKey = [yesterday.getFullYear(), String(yesterday.getMonth() + 1).padStart(2, "0"), String(yesterday.getDate()).padStart(2, "0")].join("-");
  if (uniqueDates[0] !== todayKey && uniqueDates[0] !== yesterdayKey) return "Your next streak starts with one focused session today.";
  let streak = 0;
  const cursor = uniqueDates[0] === todayKey ? today : yesterday;
  while (uniqueDates.includes([cursor.getFullYear(), String(cursor.getMonth() + 1).padStart(2, "0"), String(cursor.getDate()).padStart(2, "0")].join("-"))) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak === 1 ? "Nice start—one active day. Come back tomorrow to keep it going." : `You're on a ${streak}-day study streak. Keep it steady!`;
}

function generateStudyPlan() {
  const examId = document.getElementById("studyPlanExam").value;
  const exam = EXAMS.find(item => item.id === examId);
  const container = document.getElementById("studyPlan");
  const duration = Number(document.getElementById("studyDuration").value);
  const dailyHours = Number(document.getElementById("dailyStudyHours").value);
  if (!exam) {
    container.innerHTML = '<p class="feature-caption">Choose an exam before generating your roadmap.</p>';
    return;
  }
  if (![3, 6, 9, 12].includes(duration) || !Number.isInteger(dailyHours) || dailyHours < 1 || dailyHours > 16) {
    container.innerHTML = '<p class="feature-caption plan-error">Choose 3, 6, 9 or 12 months and enter 1–16 whole study hours per day.</p>';
    return;
  }
  try {
    const state = readStudyPlanState(exam.id);
    saveStudyPlanPreferences(exam.id, duration, dailyHours);
    renderStudyPlan(exam, duration, dailyHours, state);
  } catch (error) {
    console.error("Could not generate or save the study plan:", error);
    container.innerHTML = '<p class="feature-caption plan-error">Could not load or save this roadmap in your browser. Check browser storage settings and try again.</p>';
  }
}

function renderStudyPlan(exam, duration, dailyHours, state) {
  const months = Array.from({ length: duration }, (_, index) => createMonthPlan(exam, index, duration, dailyHours));
  const completedCount = months.filter((_, index) => state.completedMonths.includes(index + 1)).length;
  const percent = Math.round(completedCount / duration * 100);
  const colors = getChartColors();
  const guide = EXAM_GUIDES[exam.id];
  const totalSplit = guide.subjects.reduce((sum, subject) => sum + subject.split, 0);
  let offset = 0;
  const chartSegments = guide.subjects.map((subject, index) => {
    const end = offset + subject.split / totalSplit * 100;
    const value = `${colors[index % colors.length]} ${offset}% ${end}%`;
    offset = end;
    return value;
  });
  const phaseIcons = ["foundation", "practice", "revision", "mocks"];
  const last30Items = guide.last30.map((task, index) => `
    <label class="last30-item ${state.completedLast30.includes(index + 1) ? "done" : ""}">
      <input type="checkbox" ${state.completedLast30.includes(index + 1) ? "checked" : ""} onchange="toggleLast30Item('${exam.id}', ${index + 1}, this)">
      <span>${htmlEscape(task)}</span>
    </label>`).join("");
  const monthCards = months.map((month, index) => {
    const monthNumber = index + 1;
    const done = state.completedMonths.includes(monthNumber);
    return `
      <article class="roadmap-month-card phase-${month.phase.key} ${done ? "completed" : ""}">
        <div class="roadmap-month-top"><span class="phase-badge phase-badge-${month.phase.key}">${month.phase.icon} ${month.phase.name}</span><span class="month-date">MONTH ${monthNumber} · ${month.monthLabel}</span></div>
        <h4>${month.phase.icon} Month ${monthNumber}: ${htmlEscape(month.phase.name)}</h4>
        <p>${htmlEscape(month.task)}</p>
        <div class="roadmap-month-meta"><span>⏱ ${month.weeklyHours} study hours / week</span><span>📌 ${htmlEscape(month.milestone)}</span></div>
        <p class="month-tip"><strong>Tip of the month</strong> ${htmlEscape(month.tip)}</p>
        <label class="study-month-row ${done ? "done" : ""}"><input type="checkbox" ${done ? "checked" : ""} onchange="toggleStudyMonth('${exam.id}', ${monthNumber}, this)"><span>Mark month ${monthNumber} complete</span></label>
      </article>`;
  }).join("");
  document.getElementById("studyPlan").innerHTML = `
    <section class="study-progress-panel">
      <div class="progress-copy"><div><span class="mono-label">YOUR PROGRESS</span><h3>${htmlEscape(exam.name)} roadmap</h3></div><strong class="progress-percent">${percent}%</strong></div>
      <div class="study-progress-track" role="progressbar" aria-label="Study plan progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${percent}"><span style="width:${percent}%"></span></div>
      <div class="progress-footer"><span>${completedCount} of ${duration} months completed</span><span class="streak-message">${htmlEscape(formatStreakMessage(state.activityDates))}</span></div>
      <div class="plan-action-row"><button type="button" class="mini-action-btn" onclick="window.print()">🖨️ Print / Save as PDF</button><button type="button" class="mini-action-btn reset-plan-btn" onclick="resetStudyPlan('${exam.id}')">↺ Reset progress</button></div>
    </section>
    <section class="roadmap-visual-panel">
      <div class="exam-section-heading"><div><span class="mono-label">THE ROAD AHEAD</span><h3>Month-by-month milestones</h3></div><span class="feature-caption">Your ${duration}-month pace</span></div>
      <div class="phase-legend">${phaseIcons.map(key => { const phase = getStudyPhase(({ foundation: .1, practice: .4, revision: .65, mocks: .9 })[key]); return `<span class="phase-badge phase-badge-${key}">${phase.icon} ${phase.name}</span>`; }).join("")}</div>
      <div class="roadmap-timeline">${monthCards}</div>
    </section>
    <div class="plan-bottom-grid">
      <section class="exam-help-card plan-time-split"><h4>🧭 Suggested subject time split</h4><div class="plan-donut" role="img" aria-label="Suggested study time allocation by subject" style="--plan-donut:conic-gradient(${chartSegments.join(",")})"><span>Study<br>time</span></div><div class="pattern-legend">${guide.subjects.map((subject, index) => `<span><span><i style="background:${colors[index % colors.length]}"></i>${htmlEscape(subject.name)}</span><strong>${subject.split}%</strong></span>`).join("")}</div><p class="feature-caption">Planning estimate only; not official exam weightage.</p></section>
      <section class="exam-help-card last30-card"><span class="mono-label">FINAL MONTH CHECKLIST</span><h4>Last 30 days</h4><p>Short, practical reminders for your final stretch.</p><div class="last30-list">${last30Items}</div></section>
    </div>`;
}

function recordStudyActivity(state) {
  const today = new Date();
  const todayKey = [today.getFullYear(), String(today.getMonth() + 1).padStart(2, "0"), String(today.getDate()).padStart(2, "0")].join("-");
  state.activityDates = [...new Set([...state.activityDates, todayKey])].sort().slice(-365);
}

function toggleStudyMonth(examId, month, checkbox) {
  try {
    const state = readStudyPlanState(examId);
    state.completedMonths = checkbox.checked
      ? [...new Set([...state.completedMonths, month])].sort((a, b) => a - b)
      : state.completedMonths.filter(item => item !== month);
    if (checkbox.checked) recordStudyActivity(state);
    saveStudyPlanState(examId, state);
    const exam = EXAMS.find(item => item.id === examId);
    renderStudyPlan(exam, Number(document.getElementById("studyDuration").value), Number(document.getElementById("dailyStudyHours").value), state);
  } catch (error) {
    console.error("Could not save study plan progress:", error);
    checkbox.checked = !checkbox.checked;
    document.querySelector("#studyPlan .plan-error")?.remove();
    document.getElementById("studyPlan").insertAdjacentHTML("afterbegin", '<p class="feature-caption plan-error">Could not save your progress in this browser.</p>');
  }
}

function toggleLast30Item(examId, item, checkbox) {
  try {
    const state = readStudyPlanState(examId);
    state.completedLast30 = checkbox.checked
      ? [...new Set([...state.completedLast30, item])].sort((a, b) => a - b)
      : state.completedLast30.filter(value => value !== item);
    if (checkbox.checked) recordStudyActivity(state);
    saveStudyPlanState(examId, state);
    generateStudyPlan();
  } catch (error) {
    console.error("Could not save last-30-days checklist progress:", error);
    checkbox.checked = !checkbox.checked;
    document.getElementById("studyPlan").insertAdjacentHTML("afterbegin", '<p class="feature-caption plan-error">Could not save your checklist progress in this browser.</p>');
  }
}

function resetStudyPlan(examId) {
  if (!window.confirm("Reset all saved roadmap and last-30-days progress for this exam?")) return;
  try {
    localStorage.removeItem(studyPlanStorageKey(examId));
    generateStudyPlan();
  } catch (error) {
    console.error("Could not reset study plan progress:", error);
    document.getElementById("studyPlan").insertAdjacentHTML("afterbegin", '<p class="feature-caption plan-error">Could not reset saved progress in this browser.</p>');
  }
}

function recordMood(mood) {
  try {
    const history = JSON.parse(localStorage.getItem("careercompass_mood_checkins") || "[]");
    if (!Array.isArray(history)) throw new Error("Saved mood history has an invalid format.");
    history.push({ mood, at: Date.now() });
    localStorage.setItem("careercompass_mood_checkins", JSON.stringify(history.slice(-30)));
    document.getElementById("moodThanks").textContent = `Check-in noted: ${MOOD_LABELS[mood - 1]}. ${MOOD_RESPONSES[mood - 1]}`;
    document.querySelectorAll(".mood-choice").forEach(button => {
      const selected = Number(button.dataset.mood) === mood;
      button.classList.toggle("selected", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
    renderMoodHistory();
  } catch (error) {
    console.error("Could not save mood check-in:", error);
    document.getElementById("moodThanks").textContent = "This browser could not save your check-in. You can still use the other support tools.";
  }
}

function renderMoodHistory() {
  const chart = document.getElementById("moodChart");
  let history = [];
  try {
    const saved = JSON.parse(localStorage.getItem("careercompass_mood_checkins") || "[]");
    if (Array.isArray(saved)) history = saved.filter(item => item && Number.isInteger(item.mood) && item.mood >= 1 && item.mood <= 5 && Number.isFinite(item.at));
  } catch (error) {
    console.error("Could not read mood history:", error);
  }
  const recent = history.slice(-7);
  chart.innerHTML = recent.length ? recent.map(item => {
    const date = new Date(item.at);
    return `<div class="mood-bar-wrap" title="${MOOD_LABELS[item.mood - 1]} · ${date.toLocaleString()}"><div class="mood-bar" style="height:${item.mood * 18}%"></div><span>${date.toLocaleDateString(undefined, { month: "numeric", day: "numeric" })}</span></div>`;
  }).join("") : '<p class="feature-caption">Your recent check-ins will appear here.</p>';
}

function clearMoodHistory() {
  try {
    localStorage.removeItem("careercompass_mood_checkins");
    document.getElementById("moodThanks").textContent = "Your local check-in history has been cleared.";
    document.querySelectorAll(".mood-choice").forEach(button => {
      button.classList.remove("selected");
      button.setAttribute("aria-pressed", "false");
    });
    renderMoodHistory();
  } catch (error) {
    console.error("Could not clear mood history:", error);
    document.getElementById("moodThanks").textContent = "Could not clear check-ins from this browser.";
  }
}

function startBreathing() {
  if (breathingInterval) return;
  breathingStartedAt = Date.now();
  document.getElementById("breathingStart").disabled = true;
  document.getElementById("breathingStop").disabled = false;
  updateBreathing();
  breathingInterval = window.setInterval(updateBreathing, 250);
}

function updateBreathing() {
  const elapsed = Math.floor((Date.now() - breathingStartedAt) / 1000);
  const remaining = Math.max(0, 60 - elapsed);
  document.getElementById("breathingTimer").textContent = String(remaining);
  if (remaining === 0) {
    stopBreathing(true);
    return;
  }
  const beat = elapsed % 12;
  const phase = beat < 4 ? "inhale" : beat < 6 ? "hold" : "exhale";
  const cue = phase === "inhale" ? "Breathe in" : phase === "hold" ? "Gently hold" : "Breathe out";
  const lotus = document.getElementById("breathingLotus");
  lotus.dataset.phase = phase;
  document.getElementById("breathingCue").textContent = cue;
}

function stopBreathing(completed = false) {
  if (breathingInterval) window.clearInterval(breathingInterval);
  breathingInterval = null;
  document.getElementById("breathingStart").disabled = false;
  document.getElementById("breathingStop").disabled = true;
  document.getElementById("breathingLotus").dataset.phase = "ready";
  document.getElementById("breathingCue").textContent = completed ? "Well done" : "Paused";
  if (!completed && breathingStartedAt) {
    document.getElementById("breathingTimer").textContent = String(Math.max(0, 60 - Math.floor((Date.now() - breathingStartedAt) / 1000)));
  }
}

async function talkToAarav() {
  const input = document.getElementById("aaravMessage");
  const message = input.value.trim();
  const reply = document.getElementById("aaravReply");
  const button = document.getElementById("aaravSend");
  if (!message) {
    reply.textContent = "Write a little about what's on your mind, if you'd like to.";
    reply.classList.add("show");
    return;
  }
  button.disabled = true;
  reply.textContent = "Aarav is listening…";
  reply.classList.add("show");
  const prompt = `You are Aarav, a compassionate AI listener for students. Respond warmly and briefly to the student's message, reflect feelings without assuming, ask at most one gentle open question, and offer one small practical next step only if appropriate. Do not diagnose, claim to be human, or replace professional care. If there is any sign of imminent self-harm, suicide, abuse, or danger, prioritize urging them to contact a trusted person and real emergency/crisis support immediately; in India mention emergency 112 and Tele-MANAS 14416. Don't ask for identifying details. Student message: ${message}`;
  try {
    const response = await fetch("/api/generate-careers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, apiKey: localStorage.getItem("careercompass_custom_api_key") || undefined }),
      signal: AbortSignal.timeout(30000)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || `Server returned status ${response.status}`);
    if (!data.text || typeof data.text !== "string") throw new Error("Aarav returned an empty reply. Please try again.");
    reply.textContent = data.text.trim();
    input.value = "";
  } catch (error) {
    console.error("Aarav response failed:", error);
    const message = error.name === "TimeoutError" || error.name === "AbortError"
      ? "Aarav is taking longer than expected. Please try again. Your message is still here."
      : error instanceof TypeError
      ? "Can't reach the CareerCompass API. Please try again when the service is available. Your message is still here."
      : `Aarav is unavailable right now: ${error.message}. Your message is still here.`;
    reply.textContent = `${message} If you need immediate support in India, call 112 or Tele-MANAS at 14416.`;
  } finally {
    button.disabled = false;
  }
}

function useAaravPrompt(prompt) {
  const input = document.getElementById("aaravMessage");
  input.value = prompt;
  input.focus();
}

function renderPeerFeed() {
  const feed = document.getElementById("peerFeed");
  let notes = [];
  try {
    const saved = JSON.parse(localStorage.getItem("careercompass_peer_notes") || "[]");
    if (Array.isArray(saved)) notes = saved.filter(note => note && typeof note.text === "string" && Number.isFinite(note.at));
  } catch (error) {
    console.error("Could not read local peer notes:", error);
  }
  if (!notes.length) {
    feed.innerHTML = '<p class="feature-caption">Your local feed is empty. Add a kind note or question to begin.</p>';
    return;
  }
  feed.replaceChildren(...notes.slice().reverse().map(note => {
    const article = document.createElement("article");
    article.className = "peer-note";
    const text = document.createElement("p");
    text.textContent = note.text;
    const date = document.createElement("small");
    date.textContent = `Anonymous · ${new Date(note.at).toLocaleString()}`;
    article.append(text, date);
    return article;
  }));
}

function updatePeerCount() {
  const input = document.getElementById("peerPost");
  const counter = document.getElementById("peerCount");
  counter.textContent = `${input.value.length} / ${input.maxLength}`;
  counter.classList.toggle("near-limit", input.value.length >= input.maxLength - 20);
}

function postPeerNote() {
  const input = document.getElementById("peerPost");
  const text = input.value.trim();
  const status = document.getElementById("peerStatus");
  if (!text) {
    status.textContent = "Add a note or question before posting.";
    input.focus();
    return;
  }
  try {
    const notes = JSON.parse(localStorage.getItem("careercompass_peer_notes") || "[]");
    if (!Array.isArray(notes)) throw new Error("Saved peer feed has an invalid format.");
    notes.push({ text, at: Date.now() });
    localStorage.setItem("careercompass_peer_notes", JSON.stringify(notes.slice(-30)));
    input.value = "";
    updatePeerCount();
    renderPeerFeed();
    status.textContent = "Added to your local feed.";
  } catch (error) {
    console.error("Could not save peer note:", error);
    status.textContent = "Could not save your note in this browser.";
  }
}

document.addEventListener("input", event => {
  if (event.target.id === "peerPost") updatePeerCount();
});

function careerMetrics(career) {
  const profileSkills = String(currentProfile.skills || "").toLowerCase().split(/[,;|]/).map(skill => skill.trim()).filter(Boolean);
  const matched = career.skills.filter(skill => {
    const name = skill.replace(/\[.*?\]/g, "").toLowerCase();
    return profileSkills.some(profileSkill => name.includes(profileSkill) || profileSkill.includes(name));
  }).length;
  const demand = /very high|high/i.test(career.demand) ? 88 : /medium/i.test(career.demand) ? 66 : 50;
  const duration = parseInt(career.timeToPredict, 10);
  const preparation = Number.isFinite(duration) ? Math.max(45, Math.min(95, 100 - duration * 8)) : 70;
  return [
    Math.min(100, Math.max(0, career.matchScore)),
    career.skills.length ? Math.round(matched / career.skills.length * 100) : 50,
    demand,
    preparation,
    career.project ? 82 : 55
  ];
}

function renderCareerVisuals() {
  if (!Array.isArray(currentCareers) || !currentCareers.length) return;
  renderSkillRadar();
  renderComparisonChart();
  renderCareerJourney();
}

function renderSkillRadar() {
  const container = document.getElementById("skillRadarChart");
  const careers = currentCareers.slice(0, 5);
  const labels = ["Profile match", "Skill fit", "Market demand", "Prep readiness", "Project path"];
  const cx = 190, cy = 132, radius = 88;
  const angles = labels.map((_, index) => -Math.PI / 2 + index * Math.PI * 2 / labels.length);
  const polygon = (values, r) => values.map((value, index) => {
    const distance = r * value / 100;
    return `${cx + Math.cos(angles[index]) * distance},${cy + Math.sin(angles[index]) * distance}`;
  }).join(" ");
  const styles = getComputedStyle(document.documentElement);
  const grids = [20, 40, 60, 80, 100].map(value => `<polygon points="${polygon(labels.map(() => value), radius)}" fill="none" stroke="${styles.getPropertyValue("--border").trim()}" stroke-width="1"/>`).join("");
  const axes = angles.map((angle, index) => {
    const x = cx + Math.cos(angle) * radius, y = cy + Math.sin(angle) * radius;
    const lx = cx + Math.cos(angle) * (radius + 23), ly = cy + Math.sin(angle) * (radius + 23);
    return `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="${styles.getPropertyValue("--border").trim()}"/><text x="${lx}" y="${ly}" fill="${styles.getPropertyValue("--text-muted").trim()}" font-size="9" text-anchor="middle" dominant-baseline="middle">${labels[index]}</text>`;
  }).join("");
  const colors = getChartColors();
  const series = careers.map((career, index) => `<polygon points="${polygon(careerMetrics(career), radius)}" fill="${colors[index]}22" stroke="${colors[index]}" stroke-width="2"/>`).join("");
  container.innerHTML = `<svg viewBox="0 0 380 270" role="img" aria-label="Radar chart comparing skill and career fit across recommended routes">${grids}${axes}${series}</svg><div class="chart-legend">${careers.map((career, index) => `<span><i style="background:${colors[index]}"></i>${htmlEscape(career.title)}</span>`).join("")}</div>`;
}

function renderComparisonChart() {
  const container = document.getElementById("comparisonChart");
  const colors = getChartColors();
  const styles = getComputedStyle(document.documentElement);
  const careers = currentCareers.slice(0, 5);
  const width = 720, rowHeight = 44, height = Math.max(140, careers.length * rowHeight + 34);
  const startX = 185, chartWidth = 490;
  const rows = careers.map((career, index) => {
    const y = 20 + index * rowHeight;
    const metrics = careerMetrics(career);
    const match = metrics[0], fit = metrics[1];
    return `<text x="0" y="${y + 13}" fill="#F3F6FA" font-size="11">${htmlEscape(career.title.slice(0, 22))}</text>
      <rect x="${startX}" y="${y}" width="${chartWidth * match / 100}" height="12" rx="6" fill="${colors[0]}"/>
      <text x="${startX + chartWidth * match / 100 + 6}" y="${y + 10}" fill="${colors[0]}" font-size="10">${match}%</text>
      <rect x="${startX}" y="${y + 17}" width="${chartWidth * fit / 100}" height="12" rx="6" fill="${colors[1]}"/>
      <text x="${startX + chartWidth * fit / 100 + 6}" y="${y + 27}" fill="${colors[1]}" font-size="10">${fit}%</text>`;
  }).join("");
  container.innerHTML = `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Grouped bar chart of match scores and current skill fit">${[0, 25, 50, 75, 100].map(value => `<line x1="${startX + chartWidth * value / 100}" y1="8" x2="${startX + chartWidth * value / 100}" y2="${height - 6}" stroke="${styles.getPropertyValue("--border").trim()}"/><text x="${startX + chartWidth * value / 100}" y="${height - 1}" fill="${styles.getPropertyValue("--text-faint").trim()}" font-size="9" text-anchor="middle">${value}</text>`).join("")}${rows}</svg><div class="chart-legend"><span><i style="background:${colors[0]}"></i>Career match</span><span><i style="background:${colors[1]}"></i>Current skill fit</span></div>`;
}

function renderCareerJourney() {
  const first = currentCareers[0];
  const steps = [
    ["01 · START", "Your interests & strengths"],
    ["02 · BUILD", "Foundations for " + first.title],
    ["03 · PRACTICE", first.project || "A focused portfolio project"],
    ["04 · SHOW", "Portfolio, feedback & iteration"],
    ["05 · LAUNCH", "Applications & continued learning"]
  ];
  document.getElementById("careerJourneyFlow").innerHTML = steps.map(([label, title]) =>
    `<div class="journey-step"><strong>${htmlEscape(label)}</strong><span>${htmlEscape(title)}</span></div>`
  ).join("");
}

document.addEventListener("careercompass:themechange", renderCareerVisuals);

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeFeaturePages, { once: true });
} else {
  initializeFeaturePages();
}
