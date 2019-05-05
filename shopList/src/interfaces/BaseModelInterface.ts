import { ModelInterface } from './ModelInterface';

export interface BaseModelInterface {
    prototype?;
    associate?(models: ModelInterface): void;
}