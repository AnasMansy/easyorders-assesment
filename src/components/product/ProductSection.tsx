import { useState } from "react";
import star from "../../assets/img/star2.png";
import image1 from "../../assets/img/image 28.png";
import image3 from "../../assets/img/image 281.png";
import image2 from "../../assets/img/image 282.png";
import image4 from "../../assets/img/image 283.png";
import image5 from "../../assets/img/image 284.png";

type ProductSectionProps = {
    title: string;  
};
export const mockProducts = [
    {
        id: 1,
        name: "Urban Glide",
        price: 34,
        description: "Everyday street-ready sneaker with cushioned insole.",
        rate: 4.3,
        sold: 1540,
        image: image1,
    },
    {
        id: 2,
        name: "Sprint Nova",
        price: 52,
        description: "Breathable mesh upper built for quick daily runs.",
        rate: 4.1,
        sold: 980,
        image: image2,
    },
    {
        id: 3,
        name: "Trail Matrix",
        price: 79,
        description: "All-terrain grip with reinforced toe for rough paths.",
        rate: 4.7,
        sold: 2125,
        image: image3,
    },
    {
        id: 4,
        name: "Metro Classic",
        price: 46,
        description: "Clean silhouette with soft lining for day-long comfort.",
        rate: 4.5,
        sold: 1890,
        image: image4,
    },
    {
        id: 5,
        name: "Velour Ease",
        price: 39,
        description: "Soft suede finish and flexible sole for casual wear.",
        rate: 4.4,
        sold: 1210,
        image: image5,
    },
];

function ProductSection({ title }: ProductSectionProps) {
    const [showAll, setShowAll] = useState(false);

    const productsToDisplay = showAll ? mockProducts : mockProducts.slice(0, 5);

    return (
        <div className="container mt-20 mb-20">
             
            <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setShowAll((s) => !s)}
            >
                <h2 className="text-darkPrice font-semibold text-[1.5rem] md:text-[1.75rem] leading-[120%]">
                    {title}
                </h2>
                <span className="font-medium text-grayLink underline">
                    {showAll ? "View Less" : "View All"}
                </span>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-5 mt-6 gap-5 md:gap-8">
                {productsToDisplay.map((product) => {
                    const descSnippet =
                        product.description.length > 120
                            ? product.description.slice(0, 120) + "…"
                            : product.description;

                    return (
                        <div key={product.id} className="flex flex-col gap-4">
                            <div className="bg-grayLight overflow-hidden rounded-lg">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <h3 className="font-semibold text-lightDark text-sm md:text-[1.125rem]">
                                    {product.name}
                                </h3>

                                <h4 className="font-semibold text-lightDark text-base md:text-[1.25rem]">
                                    ${product.price}
                                </h4>

                                <p className="font-normal text-grayDes text-[13px] md:text-[1rem]">
                                    {descSnippet}
                                </p>

                                <div className="flex gap-[6px] items-center">
                                    <img src={star} alt="star rate" className="h-6 w-6" />
                                    <span className="text-[#0B0F0E] text-[1rem] font-normal">
                                        {product.rate}
                                    </span>
                                    <span className="md:text-[1rem] text-[0.75rem] font-normal text-grayPrice">
                                        {Intl.NumberFormat().format(product.sold)} Sold
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ProductSection;
