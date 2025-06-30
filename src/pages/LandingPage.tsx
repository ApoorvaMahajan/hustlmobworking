import React from 'react';
import { Zap, ArrowRight, BookOpen, Coffee, Package, Star, Shield, Users, Code, Database, Globe, Server, Cpu, Wallet, MessageSquare, Volume2, Languages, Bug, Rocket } from 'lucide-react';
import { StarBorder } from '../components/ui/star-border';

interface LandingPageProps {
  onSignIn: () => void;
  onSignUp: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onSignIn, onSignUp }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section 
        className="relative text-white py-24 bg-cover bg-center"
        style={{ 
          backgroundImage: "url('https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 flex items-center justify-center">
                <img src="/public/image copy copy copy copy.png" alt="Hustl Logo" className="w-full h-full object-contain" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">Campus Tasks Made Simple</h1>
            <p className="text-xl text-gray-200">
              Connect with fellow Gators to get help with quick tasks or earn money helping others on the University of Florida campus.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-12">
              <StarBorder color="#FF5A1F">
                <button 
                  onClick={onSignUp}
                  className="btn-gradient-secondary btn-shine px-8 py-4 text-lg flex items-center justify-center"
                >
                  Get Started
                  <ArrowRight className="ml-2 w-6 h-6" />
                </button>
              </StarBorder>
              <button 
                onClick={onSignIn}
                className="bg-white text-[#0F2557] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition duration-200 shadow-md"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How Hustl Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">How Hustl Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get help or earn money helping others - it's that simple!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6 shadow-lg">
                <Package className="w-12 h-12 text-[#0038FF]" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Post Your Task</h3>
              <p className="text-gray-600">
                Describe what you need help with, set your budget, and choose a convenient location on campus.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6 shadow-lg">
                <Users className="w-12 h-12 text-[#0038FF]" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Get Matched</h3>
              <p className="text-gray-600">
                Connect with verified UF students nearby who are ready to help with your task.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6 shadow-lg">
                <Star className="w-12 h-12 text-[#0038FF]" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Complete & Pay</h3>
              <p className="text-gray-600">
                Once your task is done, rate your helper and pay securely through our platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Tech Stack</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built with modern technologies for a seamless experience
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
            <TechCard icon={<Rocket className="w-10 h-10 text-[#61DAFB]" />} name="React" />
            <TechCard icon={<Database className="w-10 h-10 text-[#FFCA28]" />} name="Firebase" />
            <TechCard icon={<Code className="w-10 h-10 text-[#38BDF8]" />} name="Tailwind CSS" />
            <TechCard icon={<Globe className="w-10 h-10 text-[#4285F4]" />} name="Google Maps" />
            <TechCard icon={<Volume2 className="w-10 h-10 text-[#5436DA]" />} name="ElevenLabs" />
            <TechCard icon={<Languages className="w-10 h-10 text-[#0066FF]" />} name="Lingo.dev" />
            <TechCard icon={<Bug className="w-10 h-10 text-[#362D59]" />} name="Sentry" />
            <TechCard icon={<Wallet className="w-10 h-10 text-[#00B4D8]" />} name="RevenueCat" />
            <TechCard icon={<Server className="w-10 h-10 text-[#646CFF]" />} name="Vite" />
            <TechCard icon={<MessageSquare className="w-10 h-10 text-[#635BFF]" />} name="Stripe" />
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Meet Team Hustl</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The talented individuals behind this campus task platform
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <TeamMember 
              name="Kaushal Thota" 
              role="Lead Developer"
              image="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            />
            <TeamMember 
              name="Apoorva Mahajan" 
              role="UI/UX Designer"
              image="https://images.pexels.com/photos/3776932/pexels-photo-3776932.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            />
            <TeamMember 
              name="Sanjana Reddy" 
              role="Backend Engineer"
              image="https://images.pexels.com/photos/3775131/pexels-photo-3775131.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            />
            <TeamMember 
              name="Aditya Sharma" 
              role="Product Manager"
              image="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#0038FF] to-[#0021A5] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto">
            Join thousands of UF students already using Hustl to connect and help each other.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <StarBorder color="#FF5A1F">
              <button 
                onClick={onSignUp}
                className="btn-gradient-secondary btn-shine px-8 py-4 text-lg flex items-center justify-center"
              >
                Create Account
                <ArrowRight className="ml-2 w-6 h-6" />
              </button>
            </StarBorder>
            <button 
              onClick={onSignIn}
              className="bg-white text-[#0F2557] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition duration-200 shadow-md"
            >
              Sign In
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <div className="w-10 h-10 mr-3">
                <img src="/public/image copy copy copy copy.png" alt="Hustl Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Hustl</h3>
                <p className="text-sm text-gray-400">UF's Campus Task Platform</p>
              </div>
            </div>
            
            <div className="flex space-x-6">
              <a href="mailto:hustlapp@outlook.com" className="text-gray-400 hover:text-white transition-colors">
                Contact
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Terms
              </a>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} Hustl. All rights reserved.</p>
            <p className="mt-2">Made with ❤️ at the University of Florida</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Tech Stack Card Component
const TechCard: React.FC<{ icon: React.ReactNode; name: string }> = ({ icon, name }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-20 h-20 bg-white rounded-full shadow-md flex items-center justify-center mb-3 hover:shadow-lg transition-shadow">
        {icon}
      </div>
      <h3 className="font-semibold text-gray-800">{name}</h3>
    </div>
  );
};

// Team Member Card Component
const TeamMember: React.FC<{ name: string; role: string; image: string }> = ({ name, role, image }) => {
  return (
    <div className="premium-card overflow-hidden transform hover:scale-[1.02] transition-all duration-300">
      <div className="h-64 overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      <div className="p-6 text-center">
        <h3 className="text-xl font-bold mb-1">{name}</h3>
        <p className="text-gray-600">{role}</p>
        <div className="flex justify-center space-x-3 mt-4">
          <a href="#" className="text-[#0038FF] hover:text-[#0021A5] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </a>
          <a href="#" className="text-[#0038FF] hover:text-[#0021A5] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
            </svg>
          </a>
          <a href="#" className="text-[#0038FF] hover:text-[#0021A5] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;