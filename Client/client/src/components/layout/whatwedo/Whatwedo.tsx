import React, { useState, useEffect } from "react";
import axiosInstance from "../../../api/axiosInstance";
import { ENDPOINTS } from "../../../api/endpoint";
import bannerImage from "../../../assets/images/automotive-1-1896x590.jpg";
import "../../../styles/layout/whatwedo.css";

interface ThinkItem {
  id: number;
  whatwedodetail_id: number;
  think_image: string;
  think_header: string;
  think_desc: string;
  sort_order: number;
  created_at: string;
}

interface WhatWeDoDetailData {
  id: number;
  whatwedo_id: number;
  banner_image: string;
  banner_title: string;
  expertise_header: string;
  expertise_desc: string;
  created_at: string;
  think_items: ThinkItem[];
}

interface Props {
  whatwedoId: number;
}

const Whatwedo: React.FC<Props> = ({ whatwedoId }) => {
  const [detail, setDetail] = useState<WhatWeDoDetailData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await axiosInstance.get(
          ENDPOINTS.WHATWEDODETAIL_BY_WHATWEDO_ID(whatwedoId)
        );
        if (response.data.success) {
          setDetail(response.data.data);
        } else {
          setDetail(null);
        }
      } catch (error) {
        console.error("Error fetching What We Do detail:", error);
        setDetail(null);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [whatwedoId]);

  if (loading) {
    return (
      <div className="auto-page" style={{ paddingTop: "150px", textAlign: "center" }}>
        Loading...
      </div>
    );
  }

  if (!detail) {
    return (
      <div className="auto-page" style={{ paddingTop: "150px", textAlign: "center" }}>
        No detail found
      </div>
    );
  }

  const baseUrl = axiosInstance.defaults.baseURL?.replace('/api', '') || 'http://192.168.1.47:5000';

  const bannerImageUrl = detail.banner_image
    ? `${baseUrl}${detail.banner_image}`
    : bannerImage;

  const sortedThinkItems = [...detail.think_items].sort(
    (a, b) => a.sort_order - b.sort_order
  );

  // Assign each sorted item to a card position (1-based sort_order)
  // Card positions: 1=tall, 2=short, 3=short, 4=tall (matching the diagonal asymmetry layout)
  const card1 = sortedThinkItems.find((item) => item.sort_order === 1);
  const card2 = sortedThinkItems.find((item) => item.sort_order === 2);
  const card3 = sortedThinkItems.find((item) => item.sort_order === 3);
  const card4 = sortedThinkItems.find((item) => item.sort_order === 4);

  return (
    <div className="auto-page">
      {/* ── Hero Banner ── */}
      <section className="auto-hero">
        <img
          src={bannerImageUrl}
          alt={detail.banner_title}
          className="auto-hero__img"
        />
        <div className="auto-hero__overlay">
          <h1 className="auto-hero__title">{detail.banner_title}</h1>
        </div>
      </section>

      {/* ── Our Expertise ── */}
      <section className="auto-expertise">
        <div className="auto-container">
          <h2 className="auto-section-heading">{detail.expertise_header}</h2>
          <p className="auto-expertise__lead">{detail.expertise_desc}</p>
        </div>
      </section>

      {/* ── What We Think ── */}
      {sortedThinkItems.length > 0 && (
        <section className="auto-think">
          <div className="auto-container">
            <h2 className="auto-section-heading">What We Think</h2>

            <div className="auto-think__grid">
              {/* ── LEFT COLUMN ── */}
              <div className="auto-think__col">
                {/* Card 1 — tall (sort_order 1) */}
                {card1 && (
                  <div className="auto-think__card auto-think__card--tall">
                    <img
                      src={`${baseUrl}${card1.think_image}`}
                      alt={card1.think_header}
                    />
                    <div className="auto-think__card-overlay auto-think__card-overlay--bottom">
                      <p className="auto-think__card-title">{card1.think_header}</p>
                      {card1.think_desc && (
                        <p className="auto-think__card-excerpt">{card1.think_desc}</p>
                      )}
                    </div>
                  </div>
                )}
                {/* Card 3 — short (sort_order 3) */}
                {card3 && (
                  <div className="auto-think__card auto-think__card--short">
                    <img
                      src={`${baseUrl}${card3.think_image}`}
                      alt={card3.think_header}
                    />
                    <div className="auto-think__card-overlay auto-think__card-overlay--dark">
                      <p className="auto-think__card-title">{card3.think_header}</p>
                      {card3.think_desc && (
                        <p className="auto-think__card-excerpt">{card3.think_desc}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* ── RIGHT COLUMN ── */}
              <div className="auto-think__col">
                {/* Card 2 — short (sort_order 2) */}
                {card2 && (
                  <div className="auto-think__card auto-think__card--short">
                    <img
                      src={`${baseUrl}${card2.think_image}`}
                      alt={card2.think_header}
                    />
                    <div className="auto-think__card-overlay auto-think__card-overlay--dark">
                      <p className="auto-think__card-title">{card2.think_header}</p>
                      {card2.think_desc && (
                        <p className="auto-think__card-excerpt">{card2.think_desc}</p>
                      )}
                    </div>
                  </div>
                )}
                {/* Card 4 — tall (sort_order 4) */}
                {card4 && (
                  <div className="auto-think__card auto-think__card--tall">
                    <img
                      src={`${baseUrl}${card4.think_image}`}
                      alt={card4.think_header}
                    />
                    <div className="auto-think__card-overlay auto-think__card-overlay--dark">
                      <p className="auto-think__card-title">{card4.think_header}</p>
                      {card4.think_desc && (
                        <p className="auto-think__card-excerpt">{card4.think_desc}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Whatwedo;