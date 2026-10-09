let csrf='';
export const setCsrf=t=>{csrf=t||''};
export async function api(path,{method='GET',data,form=false,...other}={}){
 const opts={method,credentials:'same-origin',headers:{...(csrf?{'X-CSRF-Token':csrf}:{}),...(!form&&data!==undefined?{'Content-Type':'application/json'}:{}),...(other.headers||{})},...other};
 if(data!==undefined) opts.body=form?data:JSON.stringify(data);
 let response;
 try{response=await fetch('/api'+path,opts)}catch{throw new Error('Cannot connect to the Flask API. Check that the backend is running on port 5000.')}
 const result=await response.json().catch(()=>({error:'Server returned an unexpected response.'}));
 if(!response.ok)throw new Error(result.error||'Request unsuccessful');
 return result;
}

const academicNav=[
 ['Academic Overview','/academics/overview'],
 ['Curriculum','/academics/curriculum'],
 ['Academic Calendar','/academics/calendar'],
 ['Examination Corner','/academics/examination'],
 ['Syllabus','/academics/syllabus'],
 ['Book List','/academics/book-list'],
 ['Holiday List','/academics/holiday-list'],
 ['Rules & Regulations','/academics/rules-regulations']
];

export const FALLBACK={
 branding:{school_name:'Beachwood School',motto:'Global Outlook • Integrity • Shared Ownership',affiliation:'2430237',logo_url:'/assets/images/beachwood-official-logo.png',intro:'A welcoming digital campus for students, parents and educators.',address:'Satyajit Ray Sarani, City Centre, Durgapur, West Bengal – 713216',phone:'(+91) 6294561041',secondary_phone:'(+91) 9474999971',security_phone:'(+91) 8942803447',contact_description:'Use the verified school contact channels below for general enquiries, admissions support, school documents, visitor information and other official communication.',email:'',office_hours:'',social:{}},
 hero:{eyebrow:'WELCOME TO',title:'BEACHWOOD SCHOOL',tagline:'Learning with Purpose. Growing with Values.',description:'Welcome to Beachwood School, where learning extends beyond classrooms. Guided by Global Outlook, Integrity and Shared Ownership, we strive to nurture curiosity, character and confidence while encouraging every student to discover their potential.',video_url:'/assets/videos/beachwood-school-full.mp4',film_url:'/assets/videos/beachwood-school-full.mp4',poster_url:'/assets/images/hero-poster.jpg',primary_label:'Explore Our School',primary_path:'/explore-our-school',secondary_label:'Admission Enquiry',secondary_path:'/admissions#enquiry'},
 homepage:{about_heading:'Learning with Purpose. Growing with Values.',about_text:'Beachwood School aims to nurture academics, creativity and character within a caring learning community. Explore our story, values and campus life.',about_image:'/assets/images/campus-73.jpg',quick_links:[{label:'Admissions',subtitle:'Join our school',path:'/admissions',icon:'Admissions'},{label:'Pay School Fees',subtitle:'Secure provider',path:'/fees',icon:'Pay School Fees'},{label:'ERP Login',subtitle:'Student & parent',path:'/parent-corner',icon:'ERP Login'},{label:'Academic Calendar',subtitle:'Important dates',path:'/academics/calendar',icon:'Academic Calendar'},{label:'Examination Corner',subtitle:'Timetables & resources',path:'/academics/examination',icon:'Examination Corner'},{label:'Notice Board',subtitle:'Latest updates',path:'/notices',icon:'Notice Board'},{label:'Contact Us',subtitle:'Get in touch',path:'/contact',icon:'Contact Us'}],vision:'To encourage curious, responsible lifelong learners.',mission:'To support thoughtful, value-based learning.',values:'Global Outlook • Integrity • Shared Ownership',cta_heading:'Education Today. A Better Tomorrow.',cta_text:'Discover our learning community and get in touch with the school office.'},
 links:{fee_url:'https://onlinepay.schoolearth.in/?scode=MUJyQWlaNFdqdWdGbkd0SFlBL3NoQT09',erp_url:'',maps_url:'https://www.google.com/maps/search/?api=1&query=Beachwood+School+City+Centre+Durgapur',map_embed:'https://www.google.com/maps?q=Beachwood%20School%20City%20Centre%20Durgapur&output=embed'},
 footer:{description:'A school community guided by Global Outlook, Integrity and Shared Ownership.',cta_eyebrow:'BEGIN THE JOURNEY WITH BEACHWOOD SCHOOL',cta_title:'Education Today. A Better Tomorrow.',cta_text:'Discover our learning community and get in touch with the admissions office.'},
 seo:{description:'Beachwood School, Durgapur — public resources, admissions, school life and contacts.'},
 page_heroes:{
  explore:{label:'EXPLORE',title:'Discover the Beachwood Experience',text:'Our story, shared values, learning spaces and the life of our school.',image:'/assets/images/campus-96.jpg'},
  about:{label:'ABOUT US',title:'A place to learn, belong and grow.',text:'Global Outlook • Integrity • Shared Ownership',image:'/assets/images/campus-96.jpg'},
  people:{label:'OUR PEOPLE',title:'Meet the people of Beachwood',text:'Our leadership and faculty directory, maintained by the school office.',image:'/assets/images/campus-14.jpg'},
  academics:{label:'ACADEMICS',title:'Learning resources, organised clearly.',text:'Choose an academic section to view approved information and downloads.',image:'/assets/images/campus-38.jpg'},
  academic_overview:{label:'ACADEMICS',title:'Academic Overview',text:'An overview of Beachwood School’s academic programme and learning approach.',image:'/assets/images/campus-38.jpg'},
  curriculum:{label:'ACADEMICS',title:'Curriculum',text:'Published curriculum information and class-wise resources.',image:'/assets/images/campus-38.jpg'},
  calendar:{label:'ACADEMICS',title:'Academic Calendar',text:'Important academic dates, holidays, examinations and school milestones.',image:'/assets/images/campus-61.jpg'},
  examination:{label:'ACADEMICS',title:'Examination Corner',text:'Exam routines, class-wise schedules, syllabus notices and approved result information.',image:'/assets/images/campus-61.jpg'},
  syllabus:{label:'ACADEMICS',title:'Syllabus',text:'Class-wise syllabus documents and academic guidance published by the school.',image:'/assets/images/campus-38.jpg'},
  book_list:{label:'ACADEMICS',title:'Book List',text:'Approved class-wise book lists and related academic documents.',image:'/assets/images/campus-38.jpg'},
  holiday_list:{label:'ACADEMICS',title:'Holiday List',text:'Published school holidays and important non-instructional dates.',image:'/assets/images/campus-85.jpg'},
  rules:{label:'ACADEMICS',title:'Rules & Regulations',text:'School rules, academic expectations and approved student guidance.',image:'/assets/images/campus-96.jpg'},
  admissions:{label:'ADMISSIONS',title:'Your Beachwood journey starts here.',text:'Connect with the school office for accurate admission information.',image:'/assets/images/campus-2.jpg'},
  events:{label:'SCHOOL LIFE',title:'Events & Celebrations',text:'Verified upcoming and past school programmes.',image:'/assets/images/campus-61.jpg'},
  notices:{label:'SCHOOL UPDATES',title:'Notice Board',text:'Important public school updates and circulars.',image:'/assets/images/campus-38.jpg'},
  gallery:{label:'CAMPUS LIFE',title:'Photo Gallery',text:'Approved photographs from school life, activities and events.',image:'/assets/images/campus-85.jpg'},
  achievements:{label:'CELEBRATING EXCELLENCE',title:'Achievements',text:'Year-wise Class XII, Class X, entrance examination success and awards published by the school.',image:'/assets/images/campus-85.jpg'},
  facilities:{label:'OUR CAMPUS',title:'School Facilities',text:'Explore published information about learning spaces and facilities.',image:'/assets/images/campus-38.jpg'},
  fees:{label:'PARENT SERVICES',title:'Online School Fee Payment',text:'Continue securely to the school’s existing fee-payment provider.',image:'/assets/images/campus-73.jpg'},
  parent_corner:{label:'STUDENT & PARENT CORNER',title:'Everything important, in one place.',text:'Quick access to school services, resources and verified links.',image:'/assets/images/campus-38.jpg'},
  careers:{label:'CAREERS',title:'Grow with our learning community.',text:'Official vacancies are published and managed by the school administration.',image:'/assets/images/campus-26.jpg'},
  contact:{label:'CONTACT',title:"We'd love to hear from you.",text:'Reach the school office for admissions, documents, general enquiries and campus information.',image:'/assets/images/campus-96.jpg'}
 },
 navigation:[
  {label:'Home',path:'/'},
  {label:'About Us',children:[['School Overview','/about'],['History','/about#history'],['Mission & Vision','/about#vision'],['Management','/our-team?category=Leadership'],['Director’s Message','/our-team?category=Leadership'],['Principal’s Message','/our-team?category=Leadership'],['Infrastructure','/facilities']]},
  {label:'Academics',children:academicNav},
  {label:'Admissions',children:[['Admission Information','/admissions'],['Admission Procedure','/admissions#procedure'],['Admission Enquiry','/admissions#enquiry'],['Required Documents','/admissions#documents'],['Download Prospectus','/academics/prospectus']]},
  {label:'Our People',children:[['Our Team','/our-team'],['School Leadership','/our-team?category=Leadership'],['Teaching Faculty','/our-team?category=Teaching'],['Non-Teaching Staff','/our-team?category=Non-Teaching']]},
  {label:'Campus Life',children:[['Explore Our School','/explore-our-school'],['Sports','/gallery?category=Sports'],['Co-Curricular Activities','/gallery?category=Activities'],['School Clubs','/facilities'],['Cultural Activities','/gallery?category=Cultural'],['Campus Facilities','/facilities']]},
  {label:'News & Events',children:[['Latest News','/notices'],['Notice Board','/notices'],['Circulars','/notices?category=Circular'],['Upcoming Events','/events'],['School Activities','/gallery']]},
  {label:'More',children:[['Student & Parent Corner','/parent-corner'],['Facilities','/facilities'],['Achievements','/achievements'],['Photo Gallery','/gallery'],['Video Gallery','/explore-our-school#film'],['Careers','/careers'],['Mandatory Disclosure','/mandatory-disclosure'],['Downloads','/academics'],['ERP Login','/parent-corner'],['Pay School Fees','/fees'],['Important Links','/parent-corner'],['Contact Us','/contact']]}
 ]
};
export const EMPTY={faculty:[],leadership:[],notice:[],event:[],gallery:[],achievement:[],document:[],academic:[],vacancy:[],faq:[],page:[],facility:[]};
export function internalLink(path){return path?.startsWith('/')?path:'/'}
