import { useEffect } from "react";
import { FaArrowUp } from "react-icons/fa6";
import { useSignal } from "@preact/signals-react";

const BtnUp = () => {
  const isVisible = useSignal(false);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      isVisible.value = true;
    } else {
      isVisible.value = false;
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Only show button when isVisible is true */}
      <div
        className={`transform transition-transform duration-300 ease-in-out ${
          isVisible.value ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <button
          onClick={scrollToTop}
          className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-900 text-white p-2 rounded-full shadow-lg"
        >
          <FaArrowUp />
        </button>
      </div>
    </div>
  );
};

export default BtnUp;
