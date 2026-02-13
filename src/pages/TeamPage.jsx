import { Link } from 'react-router-dom';
import { ChevronRight, Facebook, Instagram, Twitter, Linkedin  } from 'lucide-react';

const TeamPage = () => {
  // Team members data 
  const teamMembers = [
    {
      id: 1,
      name: "Esra Hattapoğlu",
      profession: "Software Developer",
      image: "/teamPage/member-1.png",
      social: {
        facebook: "#",
        instagram: "#",
        twitter: "#"
      }
    },
    {
      id: 2,
      name: "Username",
      profession: "Profession",
      image: "/teamPage/member-2.png",
      social: {
        facebook: "#",
        instagram: "#",
        twitter: "#"
      }
    },
    {
      id: 3,
      name: "Username",
      profession: "Profession",
      image: "/teamPage/member-3.png",
      social: {
        facebook: "#",
        instagram: "#",
        twitter: "#"
      }
    },
    {
      id: 4,
      name: "Username",  
      profession: "Profession",
      image: "/teamPage/member-4.png",  
      social: {
        facebook: "#",
        instagram: "#", 
        twitter: "#"
      }
    },
    {
      id: 5,
      name: "Username",
      profession: "Profession",
      image: "/teamPage/member-5.png",
      social: {
        facebook: "#",
        instagram: "#",
        twitter: "#"
      }
    },
    {
      id: 6,
      name: "Username",
      profession: "Profession",
      image: "/teamPage/member-6.png",
      social: {
        facebook: "#",
        instagram: "#",
        twitter: "#"
      }
    },
    {
      id: 7,
      name: "Username",
      profession: "Profession",
      image: "/teamPage/member-7.png",
      social: {
        facebook: "#",
        instagram: "#",
        twitter: "#"
      }
    },
    {
      id: 8,
      name: "Username",
      profession: "Profession",
      image: "/teamPage/member-8.png",
      social: {
        facebook: "#",
        instagram: "#",
        twitter: "#"
      }
    },
    {
      id: 9,
      name: "Username",
      profession: "Profession",
      image: "/teamPage/member-9.png",
      social: {
        facebook: "#",
        instagram: "#",
        twitter: "#"
      }
    }
  ];

  return (
    <div className="w-full">
      
      {/* 1- hero section */}
      <section className="w-full bg-white py-6 lg:py-10">  
        <div className="container mx-auto px-8 lg:px-12">
          
          {/* title breadcrumb */}
          <div className="flex flex-col items-center text-center gap-6 mb-8 lg:mb-12">  
            <h5 className="text-[#737373] font-bold text-base">
              WHAT WE DO
            </h5>
            
            
            <h1 className="text-[#252B42] font-bold text-4xl lg:text-5xl">
              Innovation<br className="lg:hidden" /> tailored for you
            </h1>
            
            {/* breadcrumb */}
            <div className="flex items-center gap-2 text-sm font-bold">
              <Link to="/" className="text-[#252B42] hover:text-[#23A6F0]">
                Home
              </Link>
              <ChevronRight size={16} className="text-[#BDBDBD]" />
              <span className="text-[#737373]">Team</span>
            </div>
          </div>

        </div>

        {/*image grid 5 photos */}
        <div className="w-full px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 lg:gap-2">
            
            {/* large image left side */}
            <div className="lg:row-span-2">
              <img 
                src="/teamPage/hero-team-1.png" 
                alt="Team" 
                className="w-full h-[400px] lg:h-[500px] object-cover object-top" 
              />
            </div>

            {/* small images. right side */}
            <div className="grid grid-cols-2 gap-1 lg:gap-2">
              <img 
                src="/teamPage/hero-team-2.png" 
                alt="Team" 
                className="w-full h-[195px] lg:h-[245px] object-cover"  
              />
              <img 
                src="/teamPage/hero-team-3.png" 
                alt="Team" 
                className="w-full h-[195px] lg:h-[245px] object-cover"
              />
              <img 
                src="/teamPage/hero-team-4.png" 
                alt="Team" 
                className="w-full h-[195px] lg:h-[245px] object-cover"
              />
              <img 
                src="/teamPage/hero-team-5.png" 
                alt="Team" 
                className="w-full h-[195px] lg:h-[245px] object-cover"
              />
            </div>

          </div>
        </div>

      </section>

      {/* 2-meet our team section*/}
      <section className="w-full bg-white py-12 lg:py-20">
        <div className="container mx-auto px-8 lg:px-12">
          
          {/* section title */}
          <div className="flex flex-col items-center text-center mb-16">
        
        <h2 className="text-[#252B42] font-bold text-4xl">
              Meet Our<br className="lg:hidden" /> Team
            </h2>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 lg:gap-y-32 max-w-5xl mx-auto">
            {teamMembers.map((member) => (
              <div key={member.id} className="flex flex-col items-center text-center gap-4">
                
                {/* member image */}
                <div className="w-full aspect-square overflow-hidden">
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* member info */}
                <h3 className="text-[#252B42] font-bold text-base">
                  {member.name}
                </h3>
                
                <p className="text-[#737373] font-semibold text-sm">
                  {member.profession}
                </p>

                {/* social icons */}
                <div className="flex items-center gap-4">
                  <a 
                    href={member.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#23A6F0] hover:opacity-80"
                  >
                    <Facebook size={24} />
                  </a>
                  <a 
                    href={member.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#23A6F0] hover:opacity-80"
                  >
                    <Instagram size={24} />
                  </a>
                  <a 
                    href={member.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#23A6F0] hover:opacity-80"
                  >
                    <Twitter size={24} />
                  </a>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3- CTA section start your 14 days free trial */}
      <section className="w-full bg-white py-16 lg:py-20">
        <div className="container mx-auto px-8 lg:px-12">
          
          <div className="flex flex-col items-center text-center gap-6">
            
            <h2 className="text-[#252B42] font-bold text-4xl lg:text-5xl">
              Start your<br className="lg:hidden" /> 14 days free trial
            </h2>
        
            <p className="text-[#737373] text-sm max-w-md">
              <span className="lg:hidden">
                Met minim Mollie non desert Alamo est sit<br />
                cliquey dolor do met sent. RELIT official<br />
                consequent.
              </span>
              <span className="hidden lg:inline">
                Met minim Mollie non desert Alamo est sit cliquey dolor<br />
                do met sent. RELIT official consequent.
              </span>
            </p>
            
            <button className="px-10 py-4 bg-[#23A6F0] text-white font-bold text-sm rounded-md hover:bg-[#1a8ad1] transition-all mt-4">
              Try it free now
            </button>

            {/* social icons */}
            <div className="flex items-center gap-6 mt-4">
              <Twitter className="text-[#23A6F0] cursor-pointer hover:opacity-80" size={30} />
              <Facebook className="text-[#23A6F0] cursor-pointer hover:opacity-80" size={30} />
              <Instagram className="text-[#23A6F0] cursor-pointer hover:opacity-80" size={30} />
               <Linkedin className="text-[#23A6F0] cursor-pointer hover:opacity-80" size={30} />
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};

export default TeamPage;