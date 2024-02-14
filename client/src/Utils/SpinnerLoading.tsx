export const SpinnerLoading = () => {
  return (
    <div className="container m-d d-flex justify-content-center align-items-center" style={{ height: 550 }}>
      <div className="spinner-border text-primary" style={{ width: "10rem", height: "10rem" }} role="status">
        <span className="visually-hidden">Loading..</span>
      </div>
    </div>
  );
};
