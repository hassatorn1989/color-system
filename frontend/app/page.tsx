import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <section className="hero relative overflow-hidden h-screen flex items-center justify-center bg-gradient-to-r">
        {/* Animated Blobs */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-4 w-72 h-72 bg-yellow-300 dark:bg-yellow-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 dark:bg-pink-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to MyApp
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Discover our services and solutions tailored for you.
          </p>
          <div className="flex justify-center gap-4">
            <Button>
              Get Started
            </Button>
            <Button variant="outline">
              Learn More sdsdf5555
            </Button>
          </div>
        </div>
      </section>
      <section className="about py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-4">About Us</h2>
          <p className="text-md mb-6 max-w-2xl mx-auto">
            MyApp is dedicated to providing innovative color solutions for designers and developers. Our platform offers a wide range of tools and resources to help you create beautiful, accessible, and effective color systems for any project.
          </p>
          <div className="flex justify-center gap-8 mt-8">
            <div className="w-64 p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-2 text-primary">Our Mission</h3>
              <p className="">Empowering creativity through color technology and design excellence.</p>
            </div>
            <div className="w-64 p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-2 text-primary">Our Values</h3>
              <p className="">Innovation, accessibility, and user-centric solutions for everyone.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
