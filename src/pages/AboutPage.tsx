import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-10 bg-bg dark:bg-darkbg text-black dark:text-white">
      {/* Title Section */}
      <section className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">
          About Our Website
        </h1>
        <p className="text-lg mb-4">
          Your go-to destination for discovering and sharing your favorite movies.
        </p>
      </section>

      {/* Mission Section */}
      <section className="mb-10">
        <h2 className="text-3xl font-semibold mb-4">
          Our Mission
        </h2>
        <p className="mb-4">
          Our mission is to create a community where movie lovers can come together 
          to explore, share, and discuss films from various genres and cultures. 
          We believe in the power of storytelling and aim to help you find your next 
          favorite movie.
        </p>
      </section>

      {/* Features Section */}
      <section className="mb-10">
        <h2 className="text-3xl font-semibold mb-4">
          What We Offer
        </h2>
        <ul className="list-disc list-inside">
          <li>✨ Comprehensive movie database to explore a wide range of films.</li>
          <li>📚 User reviews and ratings to help you make informed choices.</li>
          <li>📰 Latest movie news and trailers to keep you updated on upcoming releases.</li>
          <li>❤️ A personalized list of your favorite movies for easy access and recommendations.</li>
        </ul>
      </section>

      {/* Get Involved Section */}
      <section>
        <h2 className="text-3xl font-semibold mb-4">
          Get Involved
        </h2>
        <p className="mb-4">
          We encourage you to join our community by signing up, sharing your reviews, 
          and participating in discussions. Your voice matters, and we can’t wait to hear 
          what you think about the movies you love!
        </p>
        <p>
          Thank you for being a part of our movie-loving family!
        </p>
      </section>
    </div>
  );
};

export default AboutPage;
