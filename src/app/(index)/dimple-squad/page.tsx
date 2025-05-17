"use client"

import { useLayoutContext } from "@/providers/index-layout-provider";
import { useEffect } from "react";
import TestimonialImage from "@/assets/images/testimonial.png"
import Image, { StaticImageData } from "next/image";
import GraduationCap from "@/assets/images/graduated_1.png"
import Playtime from "@/assets/images/playtime.png"
import Fun from "@/assets/images/fun.png"
import Presentation from "@/assets/images/presentation.png"
import Charity from "@/assets/images/charity.png"
import Juggler from "@/assets/images/juggler.png"
import ADecoration from "@/assets/images/a-text.png"
import AppleDecoration from "@/assets/images/apple.png"

export default function DimpleSquad() {
    const { updateLayout } = useLayoutContext()
    useEffect(() => {
        updateLayout({ title: 'Dimple Squad', slug: 'Dimple Squad' })
    }, [])

    return (
        <div className="max-w-[1280px] mx-auto px-1 sm:px-5 py-5 mb-24 relative">
            <div className="p-5 text-center mt-10 mb-20">
                <h2 className="text-hijau-tua text-[40px] mb-3">What is Dimple Squad Activity?</h2>
                <p className="text-[16px] text-neutral-gray font-(family-name:--font-dm-sans)">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don&apos;t look even slightly believable. If you are going to use a passage of Lorem Ipsum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. </p>
            </div>
            <Image src={TestimonialImage} alt="testimonial" className="w-full mb-20" />
            <div className="mb-10">
                <h2 className="text-[24px] text-primary font-(family-name:--font-schoolbell) text-center">Benefit</h2>
                <p className="text-[40px] text-hijau-tua max-w-[615px] mx-auto text-center">
                    There are so many things that MomDi can get here, as Squad!
                </p>
            </div>
            <div className="relative">
                <Image src={ADecoration} width={77} height={86} alt="dimple-squad" className="none sm:block absolute left-0 top-[1%]" loading="lazy" />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-[900px] mx-auto">
                    <TestimonialCard fill="#F25334" fillOpacity="0.1" image={GraduationCap} title="Kuliah Whatsapp" description="Bahas tumbuh kembang anak, gizi, sampai parenting bareng ahlinya" />
                    <TestimonialCard fill="#CFE292" fillOpacity="0.1" image={Playtime} title="Sharing resep MPASI" description="Sharing resep MPASI biar anak lahap makannya" />
                    <TestimonialCard fill="#2390FF" fillOpacity="0.1" image={Fun} title="Lelang produk" description="Lelang produk Little Dimple mulai Rp5.000 aja! Siapa cepet, dia dapet!" />
                    <TestimonialCard fill="#FFAA23" fillOpacity="0.1" image={Presentation} title="Dimple Squad Creator" description="jualan produk Little Dimple, dapet komisi, bahkan bisa dapet FREE sample product!" />
                    <TestimonialCard fill="#65FF23" fillOpacity="0.1" image={Charity} title="Mini Giveaway" description="tiap minggu! Satu MomDi yang beruntung bakal dapet produk Little Dimple GRATIS!" />
                    <TestimonialCard fill="#8484FF" fillOpacity="0.1" image={Juggler} title="Exclusive Promo" description="selalu dapet info duluan soal produk baru & bisa beli dengan special price!" />
                </div>
                <Image src={AppleDecoration} width={77} height={86} alt="dimple-squad" className="none sm:block absolute right-0 top-[30%]" loading="lazy" />
            </div>
        </div>
    )
}

const TestimonialCard = ({ fill, fillOpacity, image, title, description }: { fill: string, fillOpacity: string, image: StaticImageData, title: string, description: string }) => {
    return (
        <div className="relative flex items-center justify-center">
            <svg width="270" height="269" viewBox="0 0 270 269" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M225.839 253.47C255.827 240.711 267.973 215.839 263.132 188.175C263.132 51.4589 320.005 0.00015201 106.434 -7.1497e-06C24.424 -7.64918e-06 16.0731 19.4592 7.35034 50.0861C-6.45725 95.6829 2.54278 156.094 7.35033 197.583C9.02105 211.995 13.7604 227.047 24.424 238.535C35.8036 250.794 54.4117 257.431 71.4427 261.723C92.0198 266.905 114.66 269.301 136.072 268.97C165.463 268.514 199.184 264.81 225.839 253.47Z" fill={fill} fillOpacity={fillOpacity} />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center flex-col gap-2">
                <Image src={image} width={50} height={50} alt="testimonial" className="w-[50px] h-[50px] cursor-pointer" />
                <h5 className="text-[20px] text-hijau-tua">{title}</h5>
                <p className="font-(family-name:--font-dm-sans) text-neutral-gray max-w-[200px] text-center">{description}</p>
            </div>
        </div>
    )
}