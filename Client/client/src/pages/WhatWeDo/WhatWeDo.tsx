import { useParams } from "react-router-dom";
import Whatwedo from "../../components/layout/whatwedo/Whatwedo";

const WhatWeDo = () => {
  const { id } = useParams<{ id: string }>();
  const whatwedoId = id ? parseInt(id, 10) : null;

  if (!whatwedoId || isNaN(whatwedoId)) {
    return (
      <div className="auto-page" style={{ paddingTop: "150px", textAlign: "center" }}>
        Item not found
      </div>
    );
  }

  return <Whatwedo whatwedoId={whatwedoId} />;
};

export default WhatWeDo;