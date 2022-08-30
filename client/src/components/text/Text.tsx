import { H1, H2, H3, H4, H5, H6, Medium, Small, Normal } from './modules';
import { TextProps } from './types/textTypes';

const Text = (props: TextProps) => <Normal {...props} />;
Text.H1 = (props: TextProps) => <H1 {...props} />;
Text.H2 = (props: TextProps) => <H2 {...props} />;
Text.H3 = (props: TextProps) => <H3 {...props} />;
Text.H4 = (props: TextProps) => <H4 {...props} />;
Text.H5 = (props: TextProps) => <H5 {...props} />;
Text.H6 = (props: TextProps) => <H6 {...props} />;
Text.Medium = (props: TextProps) => <Medium {...props} />;
Text.Small = (props: TextProps) => <Small {...props} />;

export default Text;
