import educationImage from "@/assets/education-program.jpg";
import healthImage from "@/assets/health-program.jpg";
import livelihoodsImage from "@/assets/livelihoods-program.jpg";

export interface Story {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  quote?: string;
  author: string;
  role: string;
  featured?: boolean;
}

export const storiesData: Story[] = [
  {
    id: "priya-journey",
    title: "Breaking the Cycle: Priya's Journey from Student to Teacher",
    description: "Priya grew up in a remote village where accessing quality education seemed impossible. Through our scholarship program, she not only completed her education but is now a certified teacher inspiring children in her own community.",
    category: "Education",
    image: educationImage,
    quote: "Education gave me wings. Now I want to help other children in my village fly too. The foundation didn't just give me books and fees – they gave me hope and a future.",
    author: "Priya Sharma",
    role: "Primary School Teacher, Rajasthan",
    featured: true
  },
  {
    id: "lakshmi-relief",
    title: "A Mother's Relief: Access to Healthcare",
    description: "Lakshmi's newborn was saved by our mobile health clinic. Today, her daughter is a healthy 3-year-old, and Lakshmi is a health volunteer in her village.",
    category: "Health",
    image: healthImage,
    author: "Lakshmi Devi",
    role: "Community Health Volunteer"
  },
  {
    id: "ramesh-entrepreneur",
    title: "From Farm Worker to Entrepreneur",
    description: "Ramesh learned organic farming techniques through our program. He now runs a successful organic vegetable cooperative employing 20 farmers.",
    category: "Livelihoods",
    image: livelihoodsImage,
    author: "Ramesh Kumar",
    role: "Organic Cooperative Lead"
  },
  {
    id: "digital-literacy",
    title: "Digital Literacy Changes a School",
    description: "A rural school transformed after receiving computer training. Students now compete in state-level digital competitions and explore global knowledge.",
    category: "Education",
    image: educationImage,
    author: "Anoop Singh",
    role: "School Principal"
  }
];

export const testimonials = [
  {
    quote: "The teacher training program transformed how I teach. My students are more engaged, and their test scores have improved significantly.",
    author: "Anjali Verma",
    role: "Primary School Teacher",
    category: "Education"
  },
  {
    quote: "Free health check-ups and medicines have been a blessing for our village. We no longer have to travel 50km to see a doctor.",
    author: "Ravi Kumar",
    role: "Village Sarpanch",
    category: "Health"
  },
  {
    quote: "Learning tailoring changed my life. I now earn enough to support my family and send my daughters to school.",
    author: "Sunita Devi",
    role: "Tailoring Entrepreneur",
    category: "Livelihoods"
  }
];
