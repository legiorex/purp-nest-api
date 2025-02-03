export enum TopLevelCategory {
  Courses,
  Services,
  Books,
  Goods,
}

type HH = {
  count: number;
  juniorSalary: number;
  middleSalary: number;
  seniorSalary: number;
};

type Advantages = {
  title: string;
  description: string;
};

export class TopPageModel {
  _id: string;
  firstCategory: TopLevelCategory;
  secondCategory: string;
  title: string;
  category: string;
  hh?: HH;
  advantages: Advantages[];
  seoText: string;
  tagsTitle: string;
  tags: string[];
}
