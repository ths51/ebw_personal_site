import { useState, useEffect, useRef } from "react";
import './ScrollAnimation.css';

class ScrollAnimationProps {
  textURL: string;
  right: boolean = false;

  constructor(textURL: string, right: boolean) {
    this.textURL = textURL;
    this.right = right;
  }
}

function ScrollAnimation({ textURL, right }: ScrollAnimationProps) {
  const [text, setText] = useState<string[]>([]);
  const [lineHeight, setLineHeight] = useState("1vh");
  const [viewableText, setViewableText] = useState<string[]>([]);
  const textRef = useRef(text);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const viewHeight = window.innerHeight;
    // const totalHeight = document.body.scrollHeight - viewHeight;
    // const maxScrollPosition = scrollPosition;
    const totalHeight = document.body.scrollHeight;
    const maxScrollPosition = viewHeight + scrollPosition;
    const scrollPercent = Math.min(maxScrollPosition / totalHeight, 1.0);

    const greatestLineShown = Math.ceil(textRef.current.length * scrollPercent);
    if (greatestLineShown >= textRef.current.length) {
      setViewableText(textRef.current);
      return;
    }

    const frac = textRef.current.length * scrollPercent - greatestLineShown + 1;
    const charCount = Math.floor(textRef.current[greatestLineShown].length * frac);
    const newViewableText = textRef.current.slice(0, greatestLineShown);
    newViewableText.push(textRef.current[greatestLineShown].slice(0, charCount));
    setViewableText(newViewableText);
  }

  useEffect(() => {
    setLineHeight((98 / text.length) + "vh");
  }, [text]);

  useEffect(() => {
    textRef.current = text;
  }, [text]);

  useEffect(() => {
    fetch(textURL)
      .then((response) => response.text())
      .then((data) => {
        const lines = data.split('\n');
        setText(lines);
        console.log(lines);
      });

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    handleScroll();
  }, [text]);

  return (
    <>
      <div className={"scroll-animation" + (right ? " right" : " left")} style={{ lineHeight: lineHeight }}>
        <pre>
          { viewableText.map((line) => { return <>{line}<br /></> } ) }
        </pre>
      </div>
    </>
  );
}

export default ScrollAnimation;