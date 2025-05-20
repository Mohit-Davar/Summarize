import {
  FileText,
  MessageSquareQuote,
  SearchCheck,
  LocateFixed,
  Lightbulb,
  Image
} from "lucide-react";

import user1 from "../assets/profile-pictures/user1.jpg";
import user2 from "../assets/profile-pictures/user2.jpg";
import user3 from "../assets/profile-pictures/user3.jpg";
import user4 from "../assets/profile-pictures/user4.jpg";
import user5 from "../assets/profile-pictures/user5.jpg";
import user6 from "../assets/profile-pictures/user6.jpg";

export const navItems = [
  { name: "Features", link: "features" },
  { name: "Workflow", link: "workflow" },
  { name: "Testimonials", link: "testimonials" }
];

export const testimonials = [
  {
    user: "John Doe",
    company: "Stellar Solutions",
    image: user1,
    text: "The Summarizer has transformed the way our team handles research documents. We save hours every week thanks to its accurate and concise summaries.",
  },
  {
    user: "Jane Smith",
    company: "Blue Horizon Technologies",
    image: user2,
    text: "An absolute game-changer! I no longer need to sift through 100-page PDFs to find key points. The summarizer pulls out exactly what I need, fast and efficiently.",
  },
  {
    user: "David Johnson",
    company: "Quantum Innovations",
    image: user3,
    text: "Our productivity has skyrocketed since we integrated this tool into our workflow. It’s reliable, fast, and incredibly easy to use.",
  },
  {
    user: "Ronee Brown",
    company: "Fusion Dynamics",
    image: user4,
    text: "We work with complex technical PDFs daily, and this handles them with ease. The ability to get high-quality summaries in seconds is invaluable.",
  },
  {
    user: "Michael Wilson",
    company: "Visionary Creations",
    image: user5,
    text: "I use it to prep for meetings and client pitches. It pulls the essence of long reports so I can focus on decision-making instead of reading all day.",
  },
  {
    user: "Emily Davis",
    company: "Synergy Systems",
    image: user6,
    text: "The summarizer’s AI is spot-on. It understands context and tone, which makes the summaries feel natural and not robotic. Highly recommended!",
  },
];

export const features = [
  {
    icon: <FileText />,
    text: "Smart PDF Summarization",
    description:
      "Extract key points and summaries from large PDF documents using advanced AI.",
  },
  {
    icon: <MessageSquareQuote />,
    text: "Ask Questions",
    description:
      "Interact with your PDF using a built-in chatbot that can answer queries contextually from the document.",
  },
  {
    icon: <SearchCheck />,
    text: "Semantic Search",
    description:
      "Quickly find specific information within your PDFs using semantic keyword and phrase search.",
  },
  {
    icon: <LocateFixed />,
    text: "Source Highlighting",
    description:
      "Every answer includes the exact page and line reference so you can verify the information directly in the document.",
  },
  {
    icon: <Lightbulb />,
    text: "Suggested Questions",
    description:
      "Get intelligent question suggestions based on your PDF's content to guide your exploration and understanding.",
  },
  {
    icon: <Image />,
    text: "Image-Rich PDF Support",
    description:
      "Seamlessly handle PDFs containing diagrams, charts, and images — our system retains visual context while extracting insights.",
  }
];

export const checklistItems = [
  {
    title: "Upload your PDF",
    description:
      "Easily drag and drop your PDF file to begin analyzing large documents in seconds.",
  },
  {
    title: "Explore suggested questions",
    description:
      "Jumpstart your exploration with intelligent question suggestions based on your document’s content.",
  },
  {
    title: "Ask questions anytime",
    description:
      "Chat with your PDF like a human expert — ask anything and get precise, page-linked answers.",
  },
  {
    title: "See where answers come from",
    description:
      "Each response includes page and line references, so you can quickly verify source material.",
  }
];