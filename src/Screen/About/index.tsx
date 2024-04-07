import React from "react";
import about from "../../Assets/about.jpg";
import PersonProfileCard from "../../Component/PersonProfileCard";

const About = () => {
  return (
    <div>
      <div className="relative h-70 overflow-hidden rounded-lg md:h-96">
        <img
          src="https://images.unsplash.com/photo-1520473378652-85d9c4aee6cf?q=80&w=1829&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Your Image"
          className="h-1/8 w-full"
        />
      </div>
      <div className="w-full h-auto bg-white mt-10">
        <p className="text-center text-3xl capitalize font-roboto_medium tracking-wide text-primary">
          about us
        </p>
        <div className="flex items-center justify-center">
          <div className="w-24 border-t-2 border-primary/50"></div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mx-1 text-light_gold"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 14l9-5-9-5-9 5 9 5z"
            />
          </svg>
          <div className="w-24 border-t-2 border-primary/50"></div>
        </div>
        <div className="mx-5  md:mx-10 pt-5 flex flex-col md:flex-row items-center">
          <img
            src={about}
            alt=""
            className="w-full md:w-[28rem] rounded-lg shadow-2xl shadow-gray-500 mb-5 md:mb-0"
          />
          <div className="w-full md:max-w-3xl bg-gray-100 rounded-lg shadow-lg mr-5 ml-5 p-6">
            <p className="leading-relaxed text-lg font-roboto_regular">
              Welcome to Jevar Bazaar, the ultimate destination for all your
              jewelry needs. We are a one-stop solution, offering a wide range
              of exquisite jewelry options including real gold jewelry, used
              gold jewelry, imitation jewelry, silver, and platinum jewelry.
            </p>
            <p className="my-5 leading-relaxed text-lg font-roboto_regular">
              At Jevar Bazaar, We understand that buying jewelry is not only
              about acquiring a beautiful piece but also about creating
              cherished memories. That's why we strive to provide a seamless
              and enjoyable shopping experience. Our user-friendly platform
              allows you to browse through our extensive collection, compare
              prices, and make informed decisions from the comfort of your own
              home. We believe in building long-lasting relationships with our
              customers, based on trust, transparency, and exceptional
              service. What set apart is that we are only platform in India
              that offers unique lost and found safety solution to customers
              purchasing real gold jewellery through our partnered retailer.
              In the unfortunate event that your jewelry is lost or stolen,
              you can report it on our platform, and anyone who finds your
              jewellery can directly connect you by our platform. It even
              helps jewellers to report stolen jewellery by confirming the
              owner from our platform. Join us on Jevar Bazaar by safeguarding
              your jewellery and immersing yourself in the world of exquisite
              jewelry. Discover the perfect pieces that reflect your unique
              style, celebrate special moments, and leave a lasting
              impression. Trust in our secure platform and let us assist you
              in finding jewelry that truly resonates with your personal taste
              and aspirations.
            </p>
            <p className="leading-relaxed text-lg font-roboto_regular">
              Welcome to Jevar Bazaar - your trusted companion on your jewelry
              journey !!
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between mx-5 md:mx-10 my-5 md:my-10">
          <PersonProfileCard
            name="John Doe"
            occupation="Jewelry Designer"
            imageSrc="https://randomuser.me/api/portraits/men/1.jpg"
          />
          <div className="w-5 h-5 md:w-10 md:h-10"></div>
          <PersonProfileCard
            name="Jane Smith"
            occupation="Gemologist"
            imageSrc="https://randomuser.me/api/portraits/women/2.jpg"
          />
        </div>
      </div>
    </div>
  );
};

export default About;