interface IMailBuilder {
  theme?: string;
  body: {
    name: string;
    intro: string;
    action?: {
      instructions: string;
      button: {
        color: string;
        text: string;
        link: string;
      };
    };
    outro: string;
  };
}

export default IMailBuilder;
