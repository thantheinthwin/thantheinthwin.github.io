import React, { useEffect } from "react";

// Importing TagCloud package
import TagCloud from "TagCloud";

const TextShpere = () => {
  // Animation settings for Text Cloud
  useEffect(() => {
    return () => {
      const container = ".tagcloud";
      const texts = [
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "NodeJS",
        "Jquery",
        "ES6",
        "GIT",
        "GITHUB",
        "MongoDB",
        "MySql",
        "MariaDB",
        "PHP",
        "C",
        "Python",
        "C#",
        "Java",
        "ExpressJs"
      ];

      const options1 = {
        radius: 300,
        maxSpeed: "normal",
        initSpeed: "normal",
        keep: true,
      };

      const options2 = {
        radius: 200,
        maxSpeed: "normal",
        initSpeed: "normal",
        keep: true,
      };

      var media = window.matchMedia("(min-width: 1024px)");
      
      if(media.matches){
        TagCloud(container, texts, options1);
      }
      else{
        TagCloud(container, texts, options2);
      }
    };
  }, []);

  return (
    <>
      <div>
        {/* span tag className must be "tagcloud"  */}
        <span className="tagcloud dark:text-dark-theme-text"></span>
      </div>
    </>
  );
};

export default TextShpere;