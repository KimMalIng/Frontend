type SubjectType = {
  date: string;
  deadline: string;
  endTime: string;
  estimatedTime: number;
  label: number;
  name: string;
  startTime: string;
};

type CalenderData = {
  day: string;
  subject: SubjectType[];
};
type EvertyimeRequestType = {
  cookie: string,
  accessToken: string,
};

type getEveryTimeAuthType = {
  id: string;
  password: string;
};

type TranslateEveryTimeType = {
  data: string[];
};

type EveryTimeResponseType = {
  semester: number | string;
  timeline: TranslateTimeLineType[];
  year: number;
};

type TranslateTimeLineType = {
  day: number;
  subject: TimelineType[];
};

type TimelineType = {
  endTime: string;
  startTime: string;
  name: string;
};

type EveryTimeAuthHeader = {
  Accept: string;
  'Accept-Encoding': string;
  'Accept-Language': string;
  Connection: string;
  'Content-Length': string;
  'Content-Type': string;
  Host: string;
  'User-Agent': string;
};

type EveryTimeTimeTableHeaderType = {
  Accept: string;
  'Accept-Encoding': string;
  'Accept-Language': string;
  Connection: string;
  'Content-Length': string;
  'Content-Type': string;
  Cookie: string;
  Host: string;
  'User-Agent': string;
  "x-et-token": string;
};

type AuthResponseJSONType = {
  status: string;
  result: {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  }
}

type GetEveryTimeAuthReturnType = {
  cookie: string;
  accessToken: string;
  refreshToken: string;
}

export type {
  AuthResponseJSONType,
  EveryTimeAuthHeader,
  EveryTimeResponseType,
  EvertyimeRequestType,
  EveryTimeTimeTableHeaderType,
  getEveryTimeAuthType,
  GetEveryTimeAuthReturnType,
  TimelineType,
  TranslateEveryTimeType,
  TranslateTimeLineType,
  CalenderData, 
  SubjectType
};
