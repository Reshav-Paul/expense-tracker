import React from "react";

const Loading: React.FC<{ overlay?: boolean }> = function (props) {
  if (props.overlay) {
    return <div className="loading-overlay h-100 w-100 text-center d-flex flex-col ai-center jc-center">
      <h4>Loading...</h4>
    </div>
  }
  return <div className="h-100 text-center d-flex flex-col ai-center jc-center">
    <h4>Loading...</h4>
  </div>
}

export default Loading;