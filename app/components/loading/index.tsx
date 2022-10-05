import loadingImage from "~/images/loading.gif";

type LoadingProps = {
  isLoading: boolean;
};

export const Loading: React.FC<LoadingProps> = ({
  isLoading,
}): React.ReactElement => (
  <>
    {isLoading && (<div className="content-loading">
    <img
      src={loadingImage}
      alt="loading"
      className="content-loading__loading"
    />
  </div>)}
  </>
);
