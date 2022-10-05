type ErrorMessageProps = {
  errorMessage: string;
};

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  errorMessage,
}): React.ReactElement =>  <p className="error-msg text-center">{errorMessage}</p>