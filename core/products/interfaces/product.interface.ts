import { UserI } from "@/core/auth/interface";

export interface ProductI {
    id:          string;
    title:       string;
    price:       number;
    description: string;
    slug:        string;
    stock:       number;
    sizes:       Size[];
    gender:      Gender;
    tags:        Tag[];
    images:      string[];
    user:        UserI;
}

export enum Gender {
    Kid = "kid",
    Men = "men",
    Unisex = "unisex",
    Women = "women",
}

export enum Size {
    L = "L",
    M = "M",
    S = "S",
    Xl = "XL",
    Xs = "XS",
    Xxl = "XXL",
    Xxxl = "XXXL",
}

export enum Tag {
    Hats = "hats",
    Hoodie = "hoodie",
    Shirt = "shirt",
}

