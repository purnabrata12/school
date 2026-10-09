import React,{useState,useEffect,useRef,useMemo}from'react';
import{Link,useSearchParams,useLocation}from'react-router-dom';
import{motion}from'framer-motion';
import{ArrowRight,ArrowUpRight,Volume2,VolumeX,BookOpen,Wallet,LogIn,CalendarDays,ClipboardList,Bell,Phone,Eye,Target,Leaf,MapPin,Clock,GraduationCap,Images,ExternalLink,Download,Search,Briefcase,Send,ShieldCheck,Users,ChevronRight,X,CheckCircle2,Info,FileText,Menu,Building2,Star,Trophy,School,HeartHandshake}from'lucide-react';
import{api}from'../lib/api';
import{A,SmartLink,SectionHeading,PageHeader}from'../components/Layout';
const fade={initial:{opacity:0,y:14},whileInView:{opacity:1,y:0},viewport:{once:true,amount:.15},transition:{duration:.5}};
const asArr=a=>Array.isArray(a)?a:[];
const pageHero=(site,key,fallback={})=>({...fallback,...((site?.page_heroes||{})[key]||{})});
export function BlankMessage({title='Content coming soon',text='The school office can publish this section from the Principal/Admin dashboard.'}){return <div className="blank-message"><Info size={28}/><h3>{title}</h3><p>{text}</p></div>}
export function Home({site,items}){
 const hero=site.hero||{},home=site.homepage||{},links=site.links||{};
 const [muted,setMuted]=useState(true),[galleryPos,setGalleryPos]=useState(0);const video=useRef(null);
 // Existing databases may still reference the old 23-second filename: transparently use the full 104.576-second school video.
 const heroVideo=(!hero.video_url||hero.video_url==='/assets/videos/beachwood-hero.mp4')?'/assets/videos/beachwood-school-full.mp4':hero.video_url;
 const toggleAudio=()=>{const next=!muted;if(video.current){video.current.muted=next;if(video.current.paused)video.current.play().catch(()=>{});}setMuted(next);};
 const notices=asArr(items.notice).slice(0,4),events=asArr(items.event).slice(0,3),leadership=asArr(items.leadership).slice(0,3),gallery=asArr(items.gallery);
 useEffect(()=>{if(video.current)video.current.muted=muted;},[muted]);
 const defaultShortcuts=[['Admissions','Join our school',Users,'/admissions'],['Pay School Fees','Secure provider',Wallet,'/fees'],['ERP Login','Student & parent',LogIn,'/parent-corner'],['Academic Calendar','Important dates',CalendarDays,'/academics?category=Calendar'],['Examination Corner','Timetables & resources',ClipboardList,'/academics?category=Examination'],['Notice Board','Latest updates',Bell,'/notices'],['Contact Us','Get in touch',Phone,'/contact']];
 const shortcutIcons=Object.fromEntries(defaultShortcuts.map(([name,,Icon])=>[name,Icon]));
 const shortcuts=asArr(home.quick_links).length?home.quick_links.map(q=>[q.label,q.subtitle,shortcutIcons[q.icon]||BookOpen,q.path]):defaultShortcuts;
 return <>
 <section className="hero" aria-label="Welcome to Beachwood School" style={{backgroundImage:`url(${hero.poster_url||A+'hero-poster.jpg'})`,backgroundSize:'cover',backgroundPosition:'center'}}>
  <video ref={video} className="hero-video" autoPlay muted={muted} loop playsInline preload="metadata" poster={hero.poster_url||A+'hero-poster.jpg'} onError={e=>{e.currentTarget.style.display='none'}} onLoadedMetadata={e=>{e.currentTarget.muted=muted;e.currentTarget.play().catch(()=>{})}}>
    <source src={heroVideo} type="video/mp4"/>
  </video>
  <div className="hero-scrim"/>
  <div className="container hero-inner">
    <motion.div className="hero-copy" initial={{opacity:0,y:28}} animate={{opacity:1,y:0}} transition={{duration:.7}}>
      <span className="hero-eyebrow"><span className="eyebrow-line"/> {hero.eyebrow||'WELCOME TO'}</span>
      <h1>{hero.title||'BEACHWOOD SCHOOL'}</h1><p className="hero-motto">{site.branding?.motto}</p>
      <h2>{hero.tagline}</h2><p className="hero-description">{hero.description}</p>
      <div className="hero-buttons">
        <SmartLink className="btn btn-powder" to={hero.primary_path||'/explore-our-school'}>{hero.primary_label||'Explore Our School'} <ArrowRight size={17}/></SmartLink>
        <SmartLink className="btn btn-glass" to={hero.secondary_path||'/admissions#enquiry'}>{hero.secondary_label||'Admission Enquiry'} <ArrowUpRight size={16}/></SmartLink>
      </div>
    </motion.div>
    <div className="hero-bottom">
      <button type="button" className="hero-sound-control" onClick={toggleAudio} aria-pressed={!muted} aria-label={muted?'Unmute school background video':'Mute school background video'}>
        {muted?<VolumeX size={17}/>:<Volume2 size={17}/>}{muted?'Unmute':'Mute'}
      </button>
    </div>
  </div>
 </section>
 <div className="ticker"><div className="container ticker-inner"><div className="ticker-title"><Bell size={15}/> LATEST UPDATES</div><div className="ticker-items">{notices.length?notices.map(n=><Link key={n.id} to="/notices"><span className={'ticker-badge '+(n.data?.is_demo?'sample':'')}>{n.data?.is_demo?'PREVIEW':n.category||'NOTICE'}</span>{n.title}<span className="ticker-sep">|</span></Link>):<span className="ticker-wait">Official notices will appear here once published by the school.</span>}</div><Link className="ticker-all" to="/notices">View All <ArrowRight size={14}/></Link></div></div>
 <div className="container quick-wrap"><div className="quick-grid">{shortcuts.map(([label,small,Icon,to])=><SmartLink className="quick-card" key={label} to={to}><span className="quick-icon"><Icon size={24}/></span><strong>{label}</strong><small>{small}</small></SmartLink>)}</div></div>
 <section className="section about-section"><div className="container about-grid"><motion.div {...fade} className="about-copy"><span className="eyebrow">ABOUT BEACHWOOD SCHOOL</span><h2>{home.about_heading}</h2><p>{home.about_text}</p><Link to="/about" className="btn btn-ink">Know More About Us <ArrowRight size={16}/></Link><div className="about-watermark">B.</div></motion.div><motion.div {...fade} className="about-picture"><img src={home.about_image||A+'campus-73.jpg'} alt="Scene from the supplied school film" loading="lazy"/><div className="picture-marker">DISCOVER MORE <ArrowUpRight size={16}/></div></motion.div><motion.div {...fade} className="about-values"><div className="value-row"><span><Eye/></span><div><h3>Our Vision</h3><p>{home.vision}</p></div></div><div className="value-row"><span><Target/></span><div><h3>Our Mission</h3><p>{home.mission}</p></div></div><div className="value-row"><span><Leaf/></span><div><h3>Our Values</h3><p>{home.values}</p></div></div></motion.div></div></section>
 <section className="section leadership-section"><div className="container split-grid"><div><SectionHeading eyebrow="OUR LEADERSHIP" title="Guiding, Inspiring, Empowering" action="Our Team" to="/our-team"/><div className="leaders-grid">{leadership.length?leadership.map(p=><Link className="leader-card" to="/our-team?category=Leadership" key={p.id}><div className="leader-image">{p.media_url?<img src={p.media_url} alt={p.title} loading="lazy"/>:<div className="portrait-placeholder"><Users size={38}/><span>Official portrait pending</span></div>}</div><span className="leader-name">{p.title}</span><small>{p.data?.designation||p.category}</small><p>{p.summary||'Read the leadership profile.'}</p><span className="read-more">Read More <ArrowRight size={14}/></span></Link>):<div className="leaders-empty"><ShieldCheck size={34}/><h3>Meet our leadership</h3><p>Official profiles will be displayed once approved and published by the school.</p><Link to="/our-team">View Our Team <ArrowRight size={14}/></Link></div>}</div></div><div className="event-panel"><SectionHeading eyebrow="STAY CONNECTED" title="Upcoming Events" action="View All" to="/events"/><div className="events-list">{events.length?events.map(e=><Link to="/events" className="event-row" key={e.id}><div className="event-date"><strong>{e.data?.date?new Date(e.data.date).getDate():'—'}</strong><small>{e.data?.date?new Date(e.data.date).toLocaleString('en-IN',{month:'short'}):'DATE'}</small></div><div className="event-desc"><h3>{e.title}</h3><small><Clock size={12}/>{e.data?.time||'See event details'}</small><small><MapPin size={12}/>{e.data?.venue||'School event'}</small></div>{e.media_url&&<img src={e.media_url} alt="" loading="lazy"/>}</Link>):<div className="events-empty"><CalendarDays size={31}/><strong>School events calendar</strong><p>Upcoming programmes will appear here when published.</p><Link to="/events">Explore events <ArrowRight size={14}/></Link></div>}</div></div></div></section>
 <section className="achieve-bar"><div className="container achievement-inner"><div className="achievement-heading"><span className="eyebrow">OUR ACHIEVEMENTS</span><h2>Celebrating Excellence.</h2><p>Meaningful milestones. Inspiring journeys.</p></div>{asArr(items.achievement).length?asArr(items.achievement).slice(0,3).map(a=><Link className="achievement-stat" to="/achievements" key={a.id}><Star size={28}/><strong>{a.title}</strong><small>{a.summary}</small></Link>):<div className="achieve-message"><GraduationCap size={38}/><span>Our verified achievements will be featured here once approved by the school.</span><Link to="/achievements">Learn more <ArrowRight size={14}/></Link></div>}</div></section>
 <section className="section gallery-section"><div className="container"><SectionHeading eyebrow="GLIMPSES OF CAMPUS LIFE" title="Moments That Make Us Proud" action="View Gallery" to="/gallery"/><div className="gallery-strip">{gallery.length?gallery.slice(galleryPos,galleryPos+6).concat(galleryPos>Math.max(0,gallery.length-6)?gallery.slice(0,Math.max(0,6-(gallery.length-galleryPos))):[]).map((g,i)=><Link className="gallery-tile" to="/gallery" key={g.id+'-'+i}><img src={g.media_url} alt={g.title} loading="lazy"/><div>{g.title}<ArrowUpRight size={14}/></div></Link>):<BlankMessage title="Gallery is being curated"/>}</div>{gallery.length>6&&<div className="gallery-dots"><button aria-label="Previous gallery photos" onClick={()=>setGalleryPos(Math.max(0,galleryPos-1))}>←</button><span>{galleryPos+1} / {gallery.length}</span><button aria-label="Next gallery photos" onClick={()=>setGalleryPos((galleryPos+1)%gallery.length)}>→</button></div>}</div></section>
 </>
}
/** Full-length film on Explore page: loops automatically, with sound-only interaction. */
function SchoolFilm({src,poster}){
 const ref=useRef(null);const [muted,setMuted]=useState(true);
 useEffect(()=>{if(ref.current)ref.current.muted=muted;},[muted]);
 const toggle=()=>{const next=!muted;if(ref.current){ref.current.muted=next;if(ref.current.paused)ref.current.play().catch(()=>{});}setMuted(next);};
 return <div className="full-film">
  <video ref={ref} src={src} poster={poster} autoPlay muted={muted} loop playsInline preload="metadata" onLoadedMetadata={e=>{e.currentTarget.muted=muted;e.currentTarget.play().catch(()=>{})}}/>
  <button className="hero-sound-control full-film-toggle" type="button" onClick={toggle} aria-pressed={!muted} aria-label={muted?'Unmute school film':'Mute school film'}>{muted?<VolumeX size={17}/>:<Volume2 size={17}/>} {muted?'Unmute':'Mute'}</button>
 </div>
}
export function Explore({site,items}){let h=site.hero||{},home=site.homepage||{},ph=pageHero(site,'explore',{label:'EXPLORE',title:'Discover the Beachwood Experience',text:'Our story, our shared values, our learning spaces and the life of our school.',image:A+'campus-96.jpg'});return <><PageHeader {...ph}/><section className="section"><div className="container explore-grid"><div><span className="eyebrow">BEYOND THE CLASSROOM</span><h2 className="large-heading">Welcome to a community that inspires.</h2><p className="lead">{h.description}</p><Link className="btn btn-ink" to="/admissions#enquiry">Admission Enquiry <ArrowRight size={16}/></Link></div><div className="explore-image"><img src={A+'campus-61.jpg'} alt="School video still" loading="lazy"/></div></div></section><section className="section powder-section" id="film"><div className="container"><SectionHeading eyebrow="OUR SCHOOL FILM" title="Inside Beachwood"/><SchoolFilm src={h.film_url||'/assets/videos/beachwood-school-full.mp4'} poster={h.poster_url||A+'hero-poster.jpg'}/><p className="photo-note">Video supplied for this project. Confirm publishing permissions with the school before public launch.</p></div></section><section className="section"><div className="container"><SectionHeading eyebrow="WHAT GUIDES US" title="Our Vision, Mission & Values"/><div className="three-tiles">{[['Our Vision',home.vision,Eye],['Our Mission',home.mission,Target],['Our Values',home.values,Leaf]].map(([t,p,I])=><div className="feature-tile" key={t}><I size={30}/><h3>{t}</h3><p>{p}</p></div>)}</div></div></section><section className="section powder-section"><div className="container"><SectionHeading eyebrow="LIFE AT BEACHWOOD" title="A glimpse into our school" action="Open Gallery" to="/gallery"/><div className="explore-images">{asArr(items.gallery).slice(0,6).map(x=><div key={x.id}><img src={x.media_url} alt={x.title} loading="lazy"/><span>{x.title}</span></div>)}</div></div></section><section className="section"><div className="container center-action"><h2>Discover more about Beachwood.</h2><p>See our people, school updates and admission information.</p><div><Link to="/our-team" className="btn btn-ink">Our Faculty <ArrowRight size={16}/></Link><Link to="/contact" className="btn btn-outline">Contact School <ArrowRight size={16}/></Link></div></div></section></>}
const findPage=(items,slug)=>asArr(items?.page).find(x=>x.slug===slug);
function PageArticle({page,fallbackTitle,fallbackSummary,fallbackBody,fallbackImage}){const title=page?.title||fallbackTitle,summary=page?.summary||fallbackSummary,body=page?.body||fallbackBody,image=page?.media_url||fallbackImage;return <article className="generic-body info-page-article">{image&&<img className="info-page-image" src={image} alt={title}/>}<div>{summary&&<p className="lead">{summary}</p>}{body&&<div className="info-page-copy" style={{whiteSpace:'pre-wrap'}}>{body}</div>}</div></article>}
export function About({site,items}){let home=site.homepage||{},page=findPage(items,'about-overview'),ph=pageHero(site,'about_overview',pageHero(site,'about',{label:'ABOUT US',title:'School Overview',image:A+'campus-96.jpg',text:'Global Outlook • Integrity • Shared Ownership'}));return <><PageHeader {...ph}/><section className="section"><div className="container narrow"><PageArticle page={page} fallbackTitle="School Overview" fallbackSummary={home.about_heading} fallbackBody={home.about_text} fallbackImage={home.about_image}/></div></section></>}
export function AboutDetail({site,items,type}){const home=site.homepage||{};const cfg={history:{slug:'about-history',hero:'about_history',label:'ABOUT US',title:'Our History',summary:'The story and milestones of Beachwood School.',body:'Official school history and institutional milestones can be published here by the Principal/Admin.'},mission:{slug:'mission-vision',hero:'mission_vision',label:'ABOUT US',title:'Mission & Vision',summary:'The principles that guide our learning community.',body:`Our Vision\n${home.vision||''}\n\nOur Mission\n${home.mission||''}\n\nOur Values\n${home.values||''}`},director:{slug:'director-message',hero:'director_message',label:'LEADERSHIP MESSAGE',title:"Director's Message",summary:'A message from the Director of Beachwood School.',body:'The Director can publish an approved message from the Admin Portal.'},principal:{slug:'principal-message',hero:'principal_message',label:'LEADERSHIP MESSAGE',title:"Principal's Message",summary:'A message from the Principal of Beachwood School.',body:'The Principal can publish an approved message from the Admin Portal.'}}[type];let page=findPage(items,cfg.slug),ph=pageHero(site,cfg.hero,{label:cfg.label,title:page?.title||cfg.title,text:page?.summary||cfg.summary,image:page?.media_url||A+'campus-96.jpg'});return <><PageHeader {...ph}/><section className="section"><div className="container narrow"><PageArticle page={page} fallbackTitle={cfg.title} fallbackSummary={cfg.summary} fallbackBody={cfg.body}/></div></section></>}
export function ManagementPage({ site, items }) {
  const page = findPage(items, 'management');

  const leadership = asArr(items.leadership)
    .filter(person => person.published !== false)
    .sort((a, b) => {
      const getRole = person =>
        String(
          person.data?.designation ||
          person.category ||
          ''
        ).toLowerCase();

      const rank = person => {
        const role = getRole(person);

        if (role.includes('director')) return 1;
        if (
          role.includes('chairperson') ||
          role.includes('chairman')
        ) return 2;
        if (role.includes('vice principal')) return 4;
        if (role.includes('principal')) return 3;

        return 20;
      };

      const aRank = rank(a);
      const bRank = rank(b);

      if (aRank !== bRank) {
        return aRank - bRank;
      }

      return (a.sort_order || 0) - (b.sort_order || 0);
    });

  const ph = pageHero(site, 'management', {
    label: 'ABOUT US',
    title: 'Our Management Desk',
    text: 'Meet the people entrusted with guiding Beachwood School.',
    image: A + 'campus-14.jpg'
  });

  const getRole = person =>
    String(
      person.data?.designation ||
      person.category ||
      ''
    ).toLowerCase();

  const profileLink = person => {
    const role = getRole(person);

    // DIRECTOR
    if (role.includes('director')) {
      return '/about/director-message';
    }

    // PRINCIPAL
    if (
      role.includes('principal') &&
      !role.includes('vice principal')
    ) {
      return '/about/principal-message';
    }

    // CHAIRPERSON / OTHER MANAGEMENT
    return '/our-team/leadership';
  };

  const buttonLabel = person => {
    const role = getRole(person);

    if (role.includes('director')) {
      return 'Read Message';
    }

    if (
      role.includes('principal') &&
      !role.includes('vice principal')
    ) {
      return 'Read Message';
    }

    return 'View Profile';
  };

  return (
    <>
      <PageHeader {...ph} />

      <section className="management-desk-section">
        <div className="container">

          {leadership.length ? (
            <div className="management-desk-grid">

              {leadership.map(person => {
                const role =
                  person.data?.designation ||
                  person.category ||
                  'School Management';

                return (
                  <article
                    className="management-desk-card"
                    key={person.id}
                  >

                    {/* MANAGEMENT PHOTO */}
                    <div className="management-photo">
                      {person.media_url ? (
                        <img
                          src={person.media_url}
                          alt={person.title}
                          loading="lazy"
                        />
                      ) : (
                        <div className="management-photo-placeholder">
                          <Users size={44} />

                          <span>
                            Official photograph pending
                          </span>
                        </div>
                      )}
                    </div>

                    {/* MANAGEMENT INFORMATION */}
                    <div className="management-person-info">

                      <h3>
                        {person.title}
                      </h3>

                      <span className="management-designation">
                        {role}
                      </span>

                      {person.summary && (
                        <p>
                          {person.summary}
                        </p>
                      )}

                      {/* DIRECTOR AND PRINCIPAL MESSAGE LINKS */}
                      <Link
                        to={profileLink(person)}
                        className="management-profile-link"
                      >
                        {buttonLabel(person)}

                        <ArrowRight size={15} />
                      </Link>

                    </div>

                  </article>
                );
              })}

            </div>
          ) : (
            <BlankMessage
              title="Management profiles are being prepared"
              text="Add the Director, Chairperson, Principal and other approved management members from Admin → About Us Pages → Management."
            />
          )}

        </div>
      </section>
    </>
  );
}
export function Faculty({items,site,fixedCategory=null,heroKey='people',heading='Our Team'}){let [params,setParams]=useSearchParams(),[term,setTerm]=useState('');let members=[...asArr(items.leadership).map(x=>({...x,category:'Leadership'})),...asArr(items.faculty)];let category=fixedCategory||params.get('category')||'All';let cat=['All',...new Set(members.map(x=>x.category||'Teaching'))];let filtered=members.filter(x=>(category==='All'||x.category===category)&&`${x.title} ${x.data?.subjects||''} ${x.data?.department||''}`.toLowerCase().includes(term.toLowerCase()));let ph=pageHero(site,heroKey,{label:'OUR PEOPLE',title:heading,text:'School-approved profiles maintained by the administration.',image:A+'campus-14.jpg'});return <><PageHeader {...ph}/><section
  className={`section ${
    fixedCategory === 'Leadership'
      ? 'leadership-public-page'
      : ''
  }`}
><div className="container"><SectionHeading eyebrow="OUR COMMUNITY" title={heading}/><div className="filters"><div className="search-control"><Search size={17}/><input value={term} onChange={e=>setTerm(e.target.value)} placeholder="Search name, subject or department"/></div>{!fixedCategory&&<select aria-label="Filter by category" value={category} onChange={e=>setParams(e.target.value==='All'?{}:{category:e.target.value})}>{cat.map(c=><option key={c}>{c}</option>)}</select>}</div>{filtered.length?<div className="faculty-grid">{filtered.map(person=><article className="faculty-card" key={`${person.kind}-${person.id}`}><div className="faculty-photo">{person.media_url?<img src={person.media_url} loading="lazy" alt={person.title}/>:<div className="portrait-placeholder"><Users size={40}/><small>Photo pending approval</small></div>}</div><div className="faculty-details"><span className="eyebrow">{person.category||person.data?.department||'Faculty'}</span><h3>{person.title}</h3><p>{person.data?.designation||person.data?.department||''}</p>{person.data?.subjects&&<small><BookOpen size={13}/> {person.data.subjects}</small>}{person.data?.qualification&&<small>{person.data.qualification}</small>}{person.body&&<p>{person.body}</p>}</div></article>)}</div>:<BlankMessage title={term?'No matching profiles':heading+' profiles awaiting approval'} text="The Principal/Admin can add approved staff names, photographs, designations and subjects from the dashboard."/>}</div></section></>}
export function DepartmentDirectory({items,site}){let page=findPage(items,'department-directory'),people=asArr(items.faculty),groups=people.reduce((acc,p)=>{let d=p.data?.department||'Other';(acc[d]??=[]).push(p);return acc},{}),ph=pageHero(site,'people_departments',{label:'OUR PEOPLE',title:'Department Directory',text:'Explore faculty by department.',image:A+'campus-38.jpg'});return <><PageHeader {...ph}/><section className="section"><div className="container"><PageArticle page={page} fallbackTitle="Department Directory" fallbackSummary="Find faculty by academic department." fallbackBody="Departments are generated automatically from the Department field in Teaching and Non-Teaching staff profiles."/>{Object.keys(groups).length?<div className="department-directory">{Object.entries(groups).sort(([a],[b])=>a.localeCompare(b)).map(([department,members])=><section className="department-block" key={department}><SectionHeading eyebrow="DEPARTMENT" title={department}/><div className="faculty-grid">{members.map(person=><article className="faculty-card" key={person.id}><div className="faculty-photo">{person.media_url?<img src={person.media_url} alt={person.title} loading="lazy"/>:<div className="portrait-placeholder"><Users size={36}/></div>}</div><div className="faculty-details"><h3>{person.title}</h3><p>{person.data?.designation||person.category}</p>{person.data?.subjects&&<small><BookOpen size={13}/>{person.data.subjects}</small>}</div></article>)}</div></section>)}</div>:<BlankMessage title="Department directory awaiting staff profiles" text="Add a Department value to faculty profiles in the Admin Portal; this page will group them automatically."/>}</div></section></>}
export function ContentList({items,kind,title,eyebrow,text,categoryEnabled=true,site,heroKey}){let [sp,setSp]=useSearchParams(),cat=sp.get('category')||'All',[search,setSearch]=useState('');let all=asArr(items[kind]);let cats=['All',...new Set(all.map(x=>x.category).filter(Boolean))];let found=all.filter(x=>(cat==='All'||x.category===cat)&&`${x.title} ${x.summary} ${x.body}`.toLowerCase().includes(search.toLowerCase()));let image=kind==='event'?'campus-61.jpg':kind==='gallery'?'campus-85.jpg':kind==='achievement'?'campus-85.jpg':'campus-38.jpg';let ph=pageHero(site,heroKey||kind,{label:eyebrow,title,text,image:A+image});return <><PageHeader {...ph}/><section className="section"><div className="container"><div className="filters"><div className="search-control"><Search size={17}/><input placeholder={'Search '+title.toLowerCase()} value={search} onChange={e=>setSearch(e.target.value)}/></div>{categoryEnabled&&<select aria-label="Filter category" value={cat} onChange={e=>setSp(e.target.value==='All'?{}:{category:e.target.value})}>{cats.map(c=><option key={c}>{c}</option>)}</select>}</div>{found.length?<div className={'content-grid '+(kind==='gallery'?'gallery-page-grid':'')}>{found.map(x=><article className="content-card" key={x.id}>{x.media_url&&<img className="content-cover" src={x.media_url} loading="lazy" alt={x.title}/>}<div className="content-inner"><span className="eyebrow">{x.category||kind.toUpperCase()}</span><h3>{x.title}</h3><p>{x.summary||x.body}</p>{x.data?.date&&<small><CalendarDays size={13}/>{new Date(x.data.date).toLocaleDateString('en-IN',{dateStyle:'medium'})} {x.data.time||''}</small>}{x.data?.venue&&<small><MapPin size={13}/>{x.data.venue}</small>}{(x.data?.url||x.data?.attachment)&&<SmartLink className="content-action" to={x.data.url||x.data.attachment}>Open Resource <ArrowUpRight size={15}/></SmartLink>}{x.data?.is_demo&&<span className="demo-label">WEBSITE DEMONSTRATION — NOT AN OFFICIAL CIRCULAR</span>}</div></article>)}</div>:<BlankMessage title={'No '+title.toLowerCase()+' published yet'}/>}</div></section></>}
const ACADEMIC_SECTIONS={
 overview:{path:'/academics/overview',category:'Academic Overview',hero:'academic_overview',title:'Academic Overview',summary:'A clear introduction to the school’s academic programme, learning approach and published resources.',Icon:School},
 curriculum:{path:'/academics/curriculum',category:'Curriculum',hero:'curriculum',title:'Curriculum',summary:'Curriculum information and class-wise academic material published by the school.',Icon:BookOpen},
 calendar:{path:'/academics/calendar',category:'Calendar',hero:'calendar',title:'Academic Calendar',summary:'Important academic dates, events, holidays and examination milestones.',Icon:CalendarDays},
 examination:{path:'/academics/examination',category:'Examination',hero:'examination',title:'Examination Corner',summary:'Exam routines, class-wise schedules, syllabus notices and approved result information.',Icon:ClipboardList},
 syllabus:{path:'/academics/syllabus',category:'Syllabus',hero:'syllabus',title:'Syllabus',summary:'Class-wise syllabus files and subject guidance published for students and parents.',Icon:FileText},
 book_list:{path:'/academics/book-list',category:'Book List',hero:'book_list',title:'Book List',summary:'Approved class-wise book lists and academic reading requirements.',Icon:BookOpen},
 holiday_list:{path:'/academics/holiday-list',category:'Holiday',hero:'holiday_list',title:'Holiday List',summary:'Published school holidays and important non-instructional dates.',Icon:CalendarDays},
 rules:{path:'/academics/rules-regulations',category:'Rules',hero:'rules',title:'Rules & Regulations',summary:'School rules, academic expectations and approved student guidance.',Icon:ShieldCheck},
 prospectus:{path:'/academics/prospectus',category:'Prospectus',hero:'admissions',title:'Prospectus & Admission Downloads',summary:'Approved prospectus and admission-related downloads.',Icon:Download}
};
const academicRows=(items,category)=>[...asArr(items.academic),...asArr(items.document)].filter(x=>x.category===category);
export function AcademicsLanding({items,site}){let ph=pageHero(site,'academics',{label:'ACADEMICS',title:'Learning resources, organised clearly.',text:'Choose an academic section to view approved information and downloads.',image:A+'campus-38.jpg'});let cards=Object.entries(ACADEMIC_SECTIONS).filter(([k])=>k!=='prospectus');return <><PageHeader {...ph}/><section className="section academic-hub"><div className="container"><SectionHeading eyebrow="ACADEMIC DIRECTORY" title="Explore Academics"/><div className="academic-hub-grid">{cards.map(([key,cfg])=>{let I=cfg.Icon,count=academicRows(items,cfg.category).length;return <Link className="academic-hub-card" to={cfg.path} key={key}><span className="academic-hub-icon"><I size={27}/></span><div><h3>{cfg.title}</h3><p>{cfg.summary}</p><small>{count?`${count} published item${count===1?'':'s'}`:'Managed by the school office'}</small></div><ArrowRight size={18}/></Link>})}</div></div></section><section className="section warm-section"><div className="container"><SectionHeading eyebrow="ACADEMIC ACCESS" title="One place for current school resources"/><p className="lead academic-intro">Each academic item now has its own page. This keeps the navigation clean while allowing the Principal/Admin to maintain every section independently.</p></div></section></>}
export function AcademicSection({items,site,sectionKey}){let cfg=ACADEMIC_SECTIONS[sectionKey]||ACADEMIC_SECTIONS.overview,rows=academicRows(items,cfg.category),ph=pageHero(site,cfg.hero,{label:'ACADEMICS',title:cfg.title,text:cfg.summary,image:A+'campus-38.jpg'});if(sectionKey==='examination')return <ExaminationCorner items={items} site={site}/>;return <><PageHeader {...ph}/><section className="section academic-section-page"><div className="container"><div className="academic-section-top"><div><span className="eyebrow">{cfg.title.toUpperCase()}</span><h2 className="large-heading">{cfg.title}</h2><p className="lead">{cfg.summary}</p></div><Link className="btn btn-outline" to="/academics">All Academic Sections <ArrowRight size={16}/></Link></div>{rows.length?<div className="academic-resource-grid">{rows.map(x=>{let resource=x.data?.url||x.data?.attachment,media=x.media_url;return <article className="academic-resource-card" key={(x.kind||'academic')+'-'+x.id}>{media&&/\.(jpg|jpeg|png|webp|gif)(\?|$)/i.test(media)&&<img src={media} alt={x.title} loading="lazy"/>}<div><span className="eyebrow">{x.data?.class_level||x.category}</span><h3>{x.title}</h3><p>{x.summary||x.body}</p>{x.data?.session&&<small>Academic Session: {x.data.session}</small>}{resource&&<SmartLink className="content-action" to={resource}>Open / Download Resource <ArrowUpRight size={15}/></SmartLink>}</div></article>})}</div>:<BlankMessage title={'No '+cfg.title.toLowerCase()+' published yet'} text={'The Principal/Admin can publish '+cfg.title.toLowerCase()+' content from the Academic Management area.'}/>}</div></section></>}
export function ExaminationCorner({items,site}){const cfg=ACADEMIC_SECTIONS.examination,ph=pageHero(site,'examination',{label:'ACADEMICS',title:cfg.title,text:cfg.summary,image:A+'campus-61.jpg'});const all=academicRows(items,'Examination');const[cls,setCls]=useState('All'),[exam,setExam]=useState('All'),[year,setYear]=useState('All'),[lightbox,setLightbox]=useState(null);const classes=['All',...new Set(all.map(x=>x.data?.class_level).filter(Boolean))],exams=['All',...new Set(all.map(x=>x.data?.exam).filter(Boolean))],years=['All',...new Set(all.map(x=>x.data?.academic_year||x.data?.session).filter(Boolean))];const rows=all.filter(x=>(cls==='All'||x.data?.class_level===cls)&&(exam==='All'||x.data?.exam===exam)&&(year==='All'||(x.data?.academic_year||x.data?.session)===year));return <><PageHeader {...ph}/><section className="section examination-page"><div className="container"><div className="exam-head"><div><span className="eyebrow">EXAMINATION CORNER</span><h2 className="large-heading">Schedules, routines and examination resources</h2><p className="lead">The school can publish any number of examination timetable images and PDFs here. Parents can filter them by class, examination and academic year.</p></div><Link className="btn btn-outline" to="/academics">Academic Directory <ArrowRight size={16}/></Link></div>{all.length>0&&<div className="exam-filters"><label>Class<select value={cls} onChange={e=>setCls(e.target.value)}>{classes.map(x=><option key={x}>{x}</option>)}</select></label><label>Examination<select value={exam} onChange={e=>setExam(e.target.value)}>{exams.map(x=><option key={x}>{x}</option>)}</select></label><label>Academic Year<select value={year} onChange={e=>setYear(e.target.value)}>{years.map(x=><option key={x}>{x}</option>)}</select></label></div>}{rows.length?<div className="exam-board-grid">{rows.map(x=>{let image=x.media_url&&/\.(jpg|jpeg|png|webp|gif)(\?|$)/i.test(x.media_url),resource=x.data?.url||x.data?.attachment||(!image?x.media_url:'');return <article className={'exam-board-card '+(image?'has-image':'')} key={(x.kind||'academic')+'-'+x.id}>{image&&<button className="exam-image-button" onClick={()=>setLightbox(x)} aria-label={'Open '+x.title}><img src={x.media_url} alt={x.title} loading="lazy"/></button>}<div className="exam-board-info"><span className="eyebrow">{[x.data?.class_level,x.data?.exam,x.data?.academic_year||x.data?.session].filter(Boolean).join(' • ')||'EXAMINATION'}</span><h3>{x.title}</h3>{x.summary&&<p>{x.summary}</p>}{resource&&<SmartLink className="content-action" to={resource}>Open Resource <ArrowUpRight size={15}/></SmartLink>}</div></article>})}</div>:<BlankMessage title="No examination resources published yet" text="Use Admin Portal → Academics → Examination Corner to bulk-upload timetable images or PDFs."/>}</div></section>{lightbox&&<div className="exam-lightbox" onClick={()=>setLightbox(null)}><button aria-label="Close image" onClick={()=>setLightbox(null)}><X size={24}/></button><img src={lightbox.media_url} alt={lightbox.title}/><div><strong>{lightbox.title}</strong><span>{[lightbox.data?.class_level,lightbox.data?.exam,lightbox.data?.academic_year||lightbox.data?.session].filter(Boolean).join(' • ')}</span></div></div>}</>}
export function DocumentList({items,site,title='Academic Resources'}){return <AcademicsLanding items={items} site={site}/>}
export function InquiryForm({kind='admission'}){const[status,setStatus]=useState(''),[busy,setBusy]=useState(false);async function send(e){e.preventDefault();let f=e.currentTarget;const d=Object.fromEntries(new FormData(f).entries());d.kind=kind;d.consent=!!d.consent;setBusy(true);setStatus('');try{const r=await api('/public/enquiries',{method:'POST',data:d});setStatus('Thank you. Your reference number is '+r.reference+'. Please keep it for your records.');f.reset()}catch(x){setStatus(x.message)}finally{setBusy(false)}}return <form className="form-card" onSubmit={send}><div className="form-title"><span className="eyebrow">GET IN TOUCH</span><h2>{kind==='admission'?'Admission Enquiry':kind==='feedback'?'Share Feedback':'Send us a Message'}</h2><p>We will forward your message to the authorised school office.</p></div><div className="form-grid"><label>Parent / Guardian or Your Name *<input required minLength={2} maxLength={120} name="name" placeholder="Full name"/></label><label>Email Address *<input type="email" required maxLength={254} name="email" placeholder="name@example.com"/></label><label>Contact Number<input name="phone" maxLength={30} type="tel" placeholder="Contact number"/></label>{kind==='admission'&&<><label>Class Seeking Admission<select name="class_level" defaultValue=""><option value="">Select class</option>{['Nursery','LKG','UKG',...Array.from({length:12},(_,i)=>'Class '+(i+1))].map(c=><option key={c}>{c}</option>)}</select></label><label>Academic Session<input name="academic_session" placeholder="e.g. 2027–28"/></label></>}</div><label>Message {kind!=='admission'?'*':''}<textarea name="message" rows={5} required={kind!=='admission'} maxLength={3000} placeholder="How may we help?"/></label><label className="consent"><input name="consent" type="checkbox" required/> I consent to the school using these details to respond to this enquiry.</label><input tabIndex={-1} autoComplete="off" name="website" className="honeypot" aria-hidden="true"/><button className="btn btn-ink" disabled={busy}>{busy?'Submitting...':'Submit Enquiry'} <ArrowRight size={16}/></button>{status&&<p className="form-status" role="status">{status}</p>}</form>}
export function Admissions({site}){let ph=pageHero(site,'admissions',{label:'ADMISSIONS',title:'Your Beachwood journey starts here.',text:'Connect with the school office for accurate admission information.',image:A+'campus-2.jpg'});return <><PageHeader {...ph}/><section className="section"><div className="container explore-grid"><div id="procedure"><span className="eyebrow">ADMISSION INFORMATION</span><h2 className="large-heading">A warm welcome to prospective families.</h2><p className="lead">Ask the school office about the current admission process, eligibility, academic session and required documents. This site does not make admission decisions automatically.</p><div className="admission-steps">{['Submit an enquiry','School office contacts you','Receive official process and requirements','Follow the school’s verified admission instructions'].map((s,i)=><div key={s}><span>{String(i+1).padStart(2,'0')}</span>{s}</div>)}</div><div id="documents" className="minor-panel"><FileText size={23}/><p>Approved prospectus and forms will appear in Academic Downloads once published by the school.</p></div></div><div id="enquiry"><InquiryForm kind="admission"/></div></div></section></>}
export function Fees({site}){let l=site.links||{},ph=pageHero(site,'fees',{label:'PARENT SERVICES',title:'Online School Fee Payment',text:"Continue securely to the school's existing fee-payment provider.",image:A+'campus-73.jpg'});return <><PageHeader {...ph}/><section className="section"><div className="container narrow"><div className="fee-box"><Wallet size={40}/><span className="eyebrow">EXTERNAL PAYMENT PORTAL</span><h2>Pay school fees securely.</h2><p>Choose the button below to open the configured SchoolEarth payment provider. Fee amounts and instructions must be confirmed with the school office.</p><SmartLink className="btn btn-ink" to={l.fee_url||'/contact'}>Pay School Fees Online <ExternalLink size={17}/></SmartLink><p className="photo-note">Payments are handled by the external provider. Beachwood's new website does not collect or store card details.</p></div></div></section></>}
export function ParentCorner({site}){let ph=pageHero(site,'parent_corner',{label:'STUDENT & PARENT CORNER',title:'Everything important, in one place.',text:'Quick access to school services, resources and verified links.',image:A+'campus-38.jpg'});return <><PageHeader {...ph}/><section className="section"><div className="container service-grid">{[['Student / Parent ERP','Access the configured existing school portal.',LogIn,site.links?.erp_url||''],['Pay Fees','Open the school’s online payment provider.',Wallet,'/fees'],['Academic Resources','Find calendars, examinations and documents.',BookOpen,'/academics'],['Notices','View the latest published circulars.',Bell,'/notices'],['Admission Enquiry','Contact the admissions office.',Users,'/admissions#enquiry'],['Contact School','Reach the school office.',Phone,'/contact']].map(([h,p,I,to])=><div className="service-card" key={h}><I size={29}/><h3>{h}</h3><p>{p}</p>{to?<SmartLink className="text-arrow" to={to}>Open <ArrowRight size={15}/></SmartLink>:<span className="photo-note">ERP destination pending verification by the school.</span>}</div>)}</div></section></>}
export function AchievementsPage({ items, site }) {
  const rows = asArr(items.achievement)
    .filter(x => x.published !== false);

  const yearOf = x =>
    String(
      x.data?.academic_year ||
      x.data?.year ||
      (x.data?.date
        ? new Date(x.data.date).getFullYear()
        : '') ||
      ''
    ).trim();

  const sectionOf = x =>
    String(
      x.data?.section_type ||
      x.category ||
      'Custom Award'
    ).trim();

  const years = useMemo(
    () =>
      [...new Set(
        rows
          .map(yearOf)
          .filter(Boolean)
      )].sort(
        (a, b) =>
          b.localeCompare(
            a,
            undefined,
            { numeric: true }
          )
      ),
    [rows]
  );

  const ph = pageHero(
    site,
    'achievements',
    {
      label: 'CELEBRATING EXCELLENCE',
      title: 'Achievements',
      text:
        'Year-wise board results, entrance examination success and awards published by the school.',
      image: A + 'campus-85.jpg'
    }
  );

  const sections = [
    ['Class XII', 'CLASS XII'],
    ['Class X', 'CLASS X'],
    ['Entrance Exam', 'ENTRANCE EXAMINATIONS'],
    ['Custom Award', 'AWARDS & RECOGNITION']
  ];

  function isIn(x, key) {
    const v = sectionOf(x).toLowerCase();

    if (key === 'Class XII') {
      return (
        v.includes('xii') ||
        v.includes('12')
      );
    }

    if (key === 'Class X') {
      return (
        (
          v.includes('class x') ||
          v === 'x' ||
          v.includes('10')
        ) &&
        !v.includes('xii')
      );
    }

    if (key === 'Entrance Exam') {
      return v.includes('entrance');
    }

    return !(
      v.includes('xii') ||
      v.includes('12') ||
      v.includes('class x') ||
      v === 'x' ||
      v.includes('10') ||
      v.includes('entrance')
    );
  }

  function Card({ x, type }) {
    const d = x.data || {};

    const name =
      d.student_name ||
      d.recipient ||
      x.title;

    return (
      <article className="achievement-person-card">

        <div className="achievement-person-photo">
          {x.media_url ? (
            <img
              src={x.media_url}
              alt={name}
              loading="lazy"
            />
          ) : (
            <div className="portrait-placeholder">
              <Trophy size={34} />

              <small>
                Photo can be added by the school
              </small>
            </div>
          )}
        </div>

        <div className="achievement-person-copy">

          <span className="eyebrow">
            {type}
          </span>

          <h4>{name}</h4>

          {(type === 'Class XII' ||
            type === 'Class X') && (
            <>
              <div className="achievement-result-line">

                {d.percentage && (
                  <strong>
                    {d.percentage}
                    {String(d.percentage)
                      .includes('%')
                      ? ''
                      : '%'}
                  </strong>
                )}

                {d.subject_stream && (
                  <span>
                    {d.subject_stream}
                  </span>
                )}

              </div>

              {x.summary && (
                <p>{x.summary}</p>
              )}
            </>
          )}

          {type === 'Entrance Exam' && (
            <>
              <div className="achievement-result-line">

                {d.exam_name && (
                  <strong>
                    {d.exam_name}
                  </strong>
                )}

                {d.rank_score && (
                  <span>
                    {d.rank_score}
                  </span>
                )}

              </div>

              {d.subject_stream && (
                <small>
                  {d.subject_stream}
                </small>
              )}

              {x.summary && (
                <p>{x.summary}</p>
              )}
            </>
          )}

          {type === 'Custom Award' && (
            <>
              <div className="achievement-result-line">

                {d.award_title && (
                  <strong>
                    {d.award_title}
                  </strong>
                )}

                {d.subject_stream && (
                  <span>
                    {d.subject_stream}
                  </span>
                )}

              </div>

              {(x.summary || x.body) && (
                <p>
                  {x.summary || x.body}
                </p>
              )}
            </>
          )}

        </div>
      </article>
    );
  }

  return (
    <>
      <PageHeader {...ph} />

      <section className="section achievements-page">
        <div className="container">

          <div className="achievement-page-intro">

            <div>
              <span className="eyebrow">
                YEAR-WISE SCHOOL RECORD
              </span>

              <h2 className="large-heading">
                Results, entrance success and awards
              </h2>

              <p className="lead">
                Explore the achievements published by
                Beachwood School for each academic year.
              </p>
            </div>

            {years.length > 1 && (
              <label className="achievement-jump">

                <span>Jump to year</span>

                <select
                  defaultValue=""
                  onChange={e =>
                    document
                      .getElementById(
                        'achievement-year-' +
                        e.target.value
                      )
                      ?.scrollIntoView({
                        behavior: 'smooth'
                      })
                  }
                >
                  <option value="" disabled>
                    Select year
                  </option>

                  {years.map(year => (
                    <option
                      key={year}
                      value={year}
                    >
                      {year}
                    </option>
                  ))}

                </select>
              </label>
            )}

          </div>

          {years.length ? (
            years.map(year => {

              /*
               * Only sections containing records
               * are displayed on the website.
               */
              const visibleSections =
                sections
                  .map(([key, label]) => ({
                    key,
                    label,
                    records: rows.filter(
                      x =>
                        yearOf(x) === year &&
                        isIn(x, key)
                    )
                  }))
                  .filter(
                    section =>
                      section.records.length > 0
                  );

              if (!visibleSections.length) {
                return null;
              }

              return (
                <div
                  className="achievement-year"
                  id={
                    'achievement-year-' +
                    year
                  }
                  key={year}
                >

                  <div className="achievement-year-heading">

                    <span className="eyebrow">
                      ACADEMIC YEAR
                    </span>

                    <h2>{year}</h2>

                  </div>

                  {visibleSections.map(
                    section => (
                      <div
                        className="achievement-class-section"
                        key={section.key}
                      >

                        <div className="achievement-subhead">

                          <h3>
                            {section.label}
                          </h3>

                          <span>
                            {section.records.length}{' '}
                            {section.records.length === 1
                              ? 'RECORD'
                              : 'RECORDS'}
                          </span>

                        </div>

                        <div className="achievement-people-grid">

                          {section.records.map(x => (
                            <Card
                              key={x.id}
                              x={x}
                              type={section.key}
                            />
                          ))}

                        </div>

                      </div>
                    )
                  )}

                </div>
              );
            })
          ) : (
            <BlankMessage
              title="No achievements published yet"
              text="The school can create Class XII, Class X, entrance examination and award records from the Admin Portal."
            />
          )}

        </div>
      </section>
    </>
  );
}

export function Contact({site}){let b=site.branding||{},l=site.links||{},address=b.address||'Beachwood School, Satyajit Ray Sarani, City Center, Durgapur. Pin 713216',primary=b.phone||'(+91) 6294561041',secondary=b.secondary_phone||'(+91) 9474999971',security=b.security_phone||'(+91) 8942803447',ph=pageHero(site,'contact',{label:'CONTACT',title:"We'd love to hear from you.",text:'Reach the school office for admissions, documents, general enquiries and campus information.',image:A+'campus-96.jpg'});return <><PageHeader {...ph}/><section className="section"><div className="container contact-intro"><span className="eyebrow">SCHOOL OFFICE</span><h2 className="large-heading">Contact Beachwood School</h2><p className="lead">{b.contact_description||'Use the verified school contact channels below for general enquiries, admissions support, school documents, visitor information and other official communication.'}</p></div><div className="container contact-grid"><div><div className="contact-official-card"><span className="eyebrow">OFFICIAL CONTACT DETAILS</span><h3>City Centre, Durgapur</h3><div className="contact-lines"><div><MapPin size={22}/><p>{address}</p></div><div><Phone size={22}/><div className="contact-phone-stack"><a href={'tel:'+primary.replace(/[^+\d]/g,'')}>{primary}</a><a href={'tel:'+secondary.replace(/[^+\d]/g,'')}>{secondary}</a></div></div><div><ShieldCheck size={22}/><div><small>Security Helpdesk</small><a href={'tel:'+security.replace(/[^+\d]/g,'')}>{security}</a></div></div>{b.email&&<div><Send size={22}/><a href={'mailto:'+b.email}>{b.email}</a></div>}{b.office_hours&&<div><Clock size={22}/><p>{b.office_hours}</p></div>}</div></div><div className="contact-map"><iframe title="School map" src={l.map_embed} loading="lazy" referrerPolicy="no-referrer-when-downgrade"/></div><SmartLink className="text-arrow" to={l.maps_url||'/contact'}>Open in Google Maps <ArrowUpRight size={16}/></SmartLink></div><div id="form"><InquiryForm kind="contact"/></div></div></section></>}
export function Careers({items,site}){let jobs=asArr(items.vacancy),[selected,setSelected]=useState(null),[status,setStatus]=useState(''),[busy,setBusy]=useState(false);async function apply(e){e.preventDefault();if(!selected)return;setStatus('');setBusy(true);let f=e.currentTarget;let d=new FormData(f);d.set('vacancy_id',String(selected.id));d.set('consent',String(!!d.get('consent')));try{let r=await api('/public/applications',{method:'POST',data:d,form:true});setStatus('Application received. Reference: '+r.reference);f.reset()}catch(x){setStatus(x.message)}finally{setBusy(false)}}let ph=pageHero(site,'careers',{label:'CAREERS',title:'Grow with our learning community.',text:'Official vacancies are published and managed by the school administration.',image:A+'campus-26.jpg'});return <><PageHeader {...ph}/><section className="section"><div className="container"><SectionHeading eyebrow="WORK WITH US" title="Current Opportunities"/>{jobs.length?<div className="job-grid">{jobs.map(j=><div key={j.id} className="job-card"><span className="eyebrow">{j.category||'CAREER OPENING'}</span><h3>{j.title}</h3><p>{j.summary||j.body}</p>{j.data?.qualification&&<p><strong>Qualification:</strong> {j.data.qualification}</p>}{j.data?.deadline&&<small><Clock size={14}/> Apply by {j.data.deadline}</small>}<button onClick={()=>{setSelected(j);setStatus('');setTimeout(()=>document.getElementById('job-form')?.scrollIntoView({behavior:'smooth'}),50)}} className="btn btn-ink">Apply for Position <ArrowRight size={15}/></button></div>)}</div>:<BlankMessage title="There are no published vacancies at present." text="The school administration can post opportunities through the Careers dashboard."/>}{selected&&<div id="job-form" className="career-form-wrap"><form className="form-card" onSubmit={apply}><button type="button" className="close-small" onClick={()=>setSelected(null)} aria-label="Close job form"><X size={17}/></button><span className="eyebrow">APPLICATION FORM</span><h2>Apply: {selected.title}</h2><div className="form-grid"><label>Full Name *<input required minLength={2} name="applicant_name"/></label><label>Email *<input type="email" name="email" required/></label><label>Phone *<input type="tel" name="phone" required/><span className="photo-note">Use an accurate contact number.</span></label><label>Qualification<input name="qualification"/></label></div><label>Short Cover Note<textarea name="cover_letter" maxLength={2000} rows={4}/></label><label>Resume (PDF, max 5 MB) *<input name="resume" type="file" accept=".pdf,application/pdf" required/></label><label className="consent"><input type="checkbox" name="consent" required/> I agree that the school may use my submitted information to process this application.</label><button disabled={busy} className="btn btn-ink">{busy?'Submitting…':'Submit Application'} <ArrowRight size={16}/></button>{status&&<p className="form-status" role="status">{status}</p>}</form></div>}</div></section></>}
export function Generic({items,slug,title}){let page=asArr(items.page).find(x=>x.slug===slug);return <><PageHeader label="INFORMATION" title={page?.title||title} image={A+'campus-96.jpg'}/><section className="section"><div className="container narrow">{page?<article className="generic-body"><p>{page.summary}</p><div style={{whiteSpace:'pre-wrap'}}>{page.body}</div>{page.media_url&&<img src={page.media_url} alt={page.title}/>}</article>:<BlankMessage title={title+' is being prepared'} text="An authorised school administrator can publish approved information on this page from the CMS."/>}</div></section></>}
export function SearchPage({items}){let[params]=useSearchParams();let q=(params.get('q')||'').toLowerCase().trim();let results=Object.entries(items).flatMap(([kind,rows])=>asArr(rows).map(x=>({...x,kind}))).filter(x=>q&&(`${x.title} ${x.summary} ${x.body} ${x.category}`.toLowerCase().includes(q)));let paths={faculty:'/our-team',leadership:'/our-team',notice:'/notices',event:'/events',gallery:'/gallery',achievement:'/achievements',document:'/academics',academic:'/academics',vacancy:'/careers',facility:'/facilities',page:'/about',faq:'/contact'};return <><PageHeader label="SEARCH" title={'Search results '+(q?'for “'+q+'”':'')}/><section className="section"><div className="container narrow">{results.length?results.map(r=><Link to={paths[r.kind]||'/'} className="result-row" key={r.kind+r.id}><span className="eyebrow">{r.kind.toUpperCase()}</span><h3>{r.title}</h3><p>{r.summary}</p><ArrowRight size={18}/></Link>):<BlankMessage title="No matching public content" text="Try another term or explore the school navigation."/>}</div></section></>}
