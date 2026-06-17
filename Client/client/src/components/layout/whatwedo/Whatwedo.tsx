import React from "react";
import bannerImage from "../../../assets/images/automotive-1-1896x590.jpg";
import think1 from "../../../assets/images/Whatwedo1.jpg";
import think2 from "../../../assets/images/Whatwedo2.jpg";
import think3 from "../../../assets/images/Whatwedo3.jpg";
import think4 from "../../../assets/images/Whatwedo4.jpg";
import "../../../styles/layout/whatwedo.css";

interface ThinkCard {
  id: number;
  image: string;
  title: string;
  excerpt?: string;
}

interface DoCard {
  id: number;
  image: string;
  title: string;
  description: string;
}

const thinkCards: ThinkCard[] = [
  {
    id: 1,
    image: think1,
    title: "Wipro Intelligence™: Automotive Business Trends",
  },
  {
    id: 2,
    image: think2,
    title:
      "Charging Ahead: Ensuring Superior Customer Experience through Enhanced EV Battery Lifecycle Management",
    excerpt:
      "According to the International Energy Agency (IEA), the global EV market experienced an unprecedented inflection point...",
  },
  {
    id: 3,
    image: think3,
    title: "Fast Forward",
    excerpt:
      "The automotive industry's future is no longer solely dependent on hardware. Today's cars can contain as much embedded...",
  },
  {
    id: 4,
    image: think4,
    title:
      "The Digital Control Tower: Why Modernizing Auto Dealer Portals Is a Strategic Imperative",
  },
];

const doCards: DoCard[] = [
  {
    id: 1,
    image: "/assets/automotive/do-1.jpg",
    title: "Autosol-SAP",
    description: "Easy insights into future business operations",
  },
  {
    id: 2,
    image: "/assets/automotive/do-2.jpg",
    title: "Connected Cars (powered by Looking Glass and…",
    description: "Flashy? Useful? Futuristic?...",
  },
  {
    id: 3,
    image: "/assets/automotive/do-3.jpg",
    title: "Digital Marketing",
    description: "Digitizing Customer's Journey",
  },
  {
    id: 4,
    image: "/assets/automotive/do-4.jpg",
    title: "Dealer Management",
    description: "Road-tested Dealer Ecosystem Management",
  },
  {
    id: 5,
    image: "/assets/automotive/do-5.jpg",
    title: "AutoComm (Aftermarket parts E-commerce)",
    description: "Digital model for...",
  },
  {
    id: 6,
    image: "/assets/automotive/do-6.jpg",
    title: "Smart Manufacturing",
    description: "Breakthrough, game-changing, disruptive",
  },
  {
    id: 7,
    image: "/assets/automotive/do-7.jpg",
    title: "Automotive Innovation Center",
    description: "Collaboration powering...",
  },
  {
    id: 8,
    image: "/assets/automotive/do-8.jpg",
    title: "Wipro's DDPS 2.0, powered by Dell, for...",
    description: "Wipro's DDPS 2.0: A...",
  },
];

const Whatwedo: React.FC = () => {
  return (
    <div className="auto-page">
      {/* ── Hero Banner ── */}
      <section className="auto-hero">
        <img
          src={bannerImage}
          alt="Automotive factory"
          className="auto-hero__img"
        />
        <div className="auto-hero__overlay">
          <h1 className="auto-hero__title">Automotive</h1>
        </div>
      </section>

      {/* ── Our Expertise ── */}
      <section className="auto-expertise">
        <div className="auto-container">
          <h2 className="auto-section-heading">Our Expertise</h2>
          <p className="auto-expertise__lead">
            Leverage breakthrough technologies to meet customer needs of comfort,
            convenience, performance and enhanced safety
          </p>
          <p className="auto-expertise__body">
            As digital transformation and connectivity alter many facets of the
            Automotive Industry, Wipro works with clients to ensure they continue
            to innovate and remain at the forefront of change. Combining
            traditional solutions with the potential of Industry 4.0 technologies,
            we work with automotive manufacturers, OEMs and the extend supply
            chain to deliver vehicles that are safer and more enjoyable to drive.
          </p>
        </div>
      </section>

      {/* ── What We Think ── */}
      <section className="auto-think">
        <div className="auto-container">
          <h2 className="auto-section-heading">What We Think</h2>

          {/*
            Diagonal asymmetry layout:
            LEFT  col → Card1 TALL (57%) on top  + Card3 SHORT (43%) on bottom
            RIGHT col → Card2 SHORT (37%) on top + Card4 TALL  (63%) on bottom
          */}
          <div className="auto-think__grid">

            {/* ── LEFT COLUMN ── */}
            <div className="auto-think__col">
              {/* Card 1 — tall */}
              <div className="auto-think__card auto-think__card--tall">
                <img src={thinkCards[0].image} alt={thinkCards[0].title} />
                <div className="auto-think__card-overlay auto-think__card-overlay--bottom">
                  <p className="auto-think__card-title">{thinkCards[0].title}</p>
                </div>
              </div>
              {/* Card 3 — short */}
              <div className="auto-think__card auto-think__card--short">
                <img src={thinkCards[2].image} alt={thinkCards[2].title} />
                <div className="auto-think__card-overlay auto-think__card-overlay--dark">
                  <p className="auto-think__card-title">{thinkCards[2].title}</p>
                  {thinkCards[2].excerpt && (
                    <p className="auto-think__card-excerpt">
                      {thinkCards[2].excerpt}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* ── RIGHT COLUMN ── */}
            <div className="auto-think__col">
              {/* Card 2 — short */}
              <div className="auto-think__card auto-think__card--short">
                <img src={thinkCards[1].image} alt={thinkCards[1].title} />
                <div className="auto-think__card-overlay auto-think__card-overlay--dark">
                  <p className="auto-think__card-title">{thinkCards[1].title}</p>
                  {thinkCards[1].excerpt && (
                    <p className="auto-think__card-excerpt">
                      {thinkCards[1].excerpt}
                    </p>
                  )}
                </div>
              </div>
              {/* Card 4 — tall */}
              <div className="auto-think__card auto-think__card--tall">
                <img src={thinkCards[3].image} alt={thinkCards[3].title} />
                <div className="auto-think__card-overlay auto-think__card-overlay--dark">
                  <p className="auto-think__card-title">{thinkCards[3].title}</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── What We Do ── */}
      <section className="auto-do">
        <div className="auto-container">
          <h2 className="auto-section-heading">What We Do</h2>
          <div className="auto-do__grid">
            {doCards.map((card) => (
              <div key={card.id} className="auto-do__card">
                <div className="auto-do__card-img-wrap">
                  <img src={card.image} alt={card.title} />
                </div>
                <div className="auto-do__card-body">
                  <h4 className="auto-do__card-title">{card.title}</h4>
                  <p className="auto-do__card-desc">{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Whatwedo;