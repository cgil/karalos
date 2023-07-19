const NotFoundPage = (): JSX.Element => <div>Nothing to see here.</div>;

// Named exports does not work with React.lazy currently
// reference: https://reactjs.org/docs/code-splitting.html
// eslint-disable-next-line import/no-default-export
export default NotFoundPage;
