import { renderToString } from "solid-js/web";
import { render } from "takumi-js";

export const getOgImage = async () => {
  const html = renderToString(() => (
    <div
      style={{
        "font-size": "72px",
        background: "linear-gradient(to bottom right, #fff7ed, #fecaca)",
        width: "100%",
        height: "100%",
        display: "flex",
        "align-items": "center",
        "justify-content": "center",
      }}
    >
      Hello Takumi
    </div>
  ));

  return render(html, { width: 1200, height: 630 });
};
