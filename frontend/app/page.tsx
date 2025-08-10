import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <section className="hero py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to MyApp
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Discover our services and solutions tailored for you.
          </p>
          <div className="flex justify-center gap-4">
            <Button >
              Get Started
            </Button>
            <Button variant="outline">
              Learn More aaaaa
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
