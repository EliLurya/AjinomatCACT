import {ResponseType} from "./HttpTypes";
import {Edge, Node} from "reactflow";

interface Product<TaleRow> {
    id: number,
    name: string,
    date: string,

    [key: string]: [value: any]
}

interface AuthType {
    refresh: string,
    access: string
}

interface UserType extends ResponseType {
    id: number,
    first_name: string,
    last_name: string,
    username: string,
    email: string,
    password?: string
}

interface ProjectType extends ResponseType{
    id: number,
    name: string,
    description:string,
    [key:string] : [value : string | File]
}

interface ProtocolFlowType{
    nodes: Array<Node>,
    edges:Array<Edge>
}
interface ProtocolType extends ResponseType {
    id?:number,
    aliquot_date?: string,
    created_at?: string,
    ingredients?: []
    name:stirng,
    processes?:[],
    reagent?: string,
    reference_author?:string,
    updated_at?: string,
    flow: ProtocolFlowType,
    extra: object,
    custom_sensory_panels: array,
    taste_intensity: object,
    aroma_intensity: object,
    nutrition_info: object,
    texture_metrics: object,
    project: number
    meta_recipes_count: number
    is_draft: number
}

interface IngredientType {
    name: string,
    amount: string,
    unit: string,

    [key: string]: string
}//inteface of ingredient
interface ingredientList {
  name: string;
  synonyms: string;
  ingredient_type: string;
}
type ListType<T> = Merge<{ results: Array<T> }, PaginationType>
