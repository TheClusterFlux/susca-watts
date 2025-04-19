export interface CourseItem {
    id: number;
    title: string;
    description: string;
    imageUrl?: string;
    subCategories: SubCategory[];
}

export interface SubCategory {
    id: number;
    name: string;
    duration?: string;
    qualification?: string;
    certification?: string;
    venue?: string;
    link?: string;
}