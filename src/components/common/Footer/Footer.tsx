import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t mt-8">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center text-gray-600">
          <p>
            &copy; 2025 ARTINUS Frontend Assignment. All rights reserved.
          </p>
          <p className="mt-2 text-sm">
            Powered by{" "}
            <a
              href="https://dummyjson.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              DummyJSON API
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;