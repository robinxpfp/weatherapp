import Image from "next/image";
import React from "react";

export default function Values(props: any) {
  return (
    <div className="flex justify-between text-sm">
      <div className="flex space-x-2">
        <Image
          className="w-5 h-5"
          width={20}
          height={20}
          src={props.img}
          alt={props.texto}
          title={props.texto}
        />
        <p className="subpixel-antialiased font-medium">{props.texto}</p>
      </div>
      <p>{props.valor ? props.valor : "......"}</p>
    </div>
  );
}
