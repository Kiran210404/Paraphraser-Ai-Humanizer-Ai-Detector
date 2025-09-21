
export enum Tab {
  Paraphraser = 'paraphraser',
  Humanizer = 'humanizer',
  Detector = 'detector',
}

export interface DetectorResult {
  score: number;
  explanation: string;
}
