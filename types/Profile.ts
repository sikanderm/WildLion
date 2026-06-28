export interface Profile {
  id: number;
  title: string;
  url: string;
  intro: string;
  date: string;
  reserve: string;
  mentioned: string[];
  content: {
    type: string;
    heading: string;
    paragraph: string;
    imageSrc: string;
    caption: string;
  }[];
}
