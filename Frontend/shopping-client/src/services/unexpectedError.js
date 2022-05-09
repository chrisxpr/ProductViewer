const unexpectedError = (error) => {
  console.error(error);
  const errorResponse = {
    data: {
      inError: true,
      errorMessage: 'An unexpected error has occurred',
      detailedError: error.name + ': ' + error.message,
    },
  };
  return errorResponse;
};

export { unexpectedError };
