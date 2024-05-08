import ContentLoader from 'react-content-loader';

const Skeleton = (props) => (
  <ContentLoader
    speed={5}
    width={310}
    height={200}
    viewBox="0 0 310 200"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="4" rx="0" ry="0" width="114" height="108" />
    <rect x="0" y="125" rx="0" ry="0" width="70" height="18" />
    <rect x="83" y="124" rx="0" ry="0" width="70" height="19" />
    <rect x="0" y="151" rx="0" ry="0" width="33" height="26" />
    <rect x="51" y="153" rx="0" ry="0" width="33" height="26" />
    <rect x="98" y="151" rx="0" ry="0" width="33" height="25" />
    <rect x="0" y="183" rx="0" ry="0" width="107" height="7" />
    <rect x="0" y="196" rx="0" ry="0" width="107" height="7" />
  </ContentLoader>
);

export default Skeleton;
