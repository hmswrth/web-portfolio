import React, { useEffect } from "react";
import './HomeRoom.scss'

function HomeRoomComponent() {
  const h = document.querySelector("#h");
  const b = document.body;

  let base = (e) => {
    var x = e.pageX / window.innerWidth - 0.5;
    var y = e.pageY / window.innerHeight - 0.5;
    h.style.transform = `
        perspective(90vw)
        rotateX(${y * 4 + 75}deg)
        rotateZ(${-x * 12 + 45}deg)
        translateZ(-9vw)
    `;
  };

  useEffect(() => {
    b.addEventListener("pointermove", base);
    return () => {
      b.removeEventListener("pointermove", base);
    };
  }, [base]);

  b.addEventListener("pointermove", base);

  return (
    <div class="house" id="h">
      <div class="h-lights">
        <div class="h-light"></div>
        <div class="h-light"></div>
        <div class="h-light"></div>
        <div class="h-light"></div>
        <div class="h-light"></div>
        <div class="h-light"></div>
      </div>
      <div class="h-shadow"></div>
      <div class="alt">
        <div class="alt__front face"> </div>
        <div class="alt__back face"> </div>
        <div class="alt__right face"> </div>
        <div class="alt__left face"> </div>
        <div class="alt__top face">
          <div class="light"></div>
          <div class="light"></div>
          <div class="light"></div>
          <div class="light"></div>
          <div class="light"></div>
          <div class="light"></div>
          <div class="light"></div>
          <div class="light"></div>
          <div class="light"></div>
        </div>
        <div class="alt__bottom face"> </div>
      </div>
      <div class="alb">
        <div class="alb__front face"> </div>
        <div class="alb__back face"> </div>
        <div class="alb__right face"> </div>
        <div class="alb__left face"> </div>
        <div class="alb__top face"> </div>
        <div class="alb__bottom face"> </div>
      </div>
      <div class="arb">
        <div class="arb__front face"> </div>
        <div class="arb__back face"> </div>
        <div class="arb__right face"> </div>
        <div class="arb__left face"> </div>
        <div class="arb__top face"> </div>
        <div class="arb__bottom face"> </div>
      </div>
      <div class="blt">
        <div class="blt__front face"> </div>
        <div class="blt__back face"> </div>
        <div class="blt__right face"> </div>
        <div class="blt__left face"> </div>
        <div class="blt__top face"> </div>
        <div class="blt__bottom face"> </div>
      </div>
      <div class="blt2">
        <div class="blt2__front face"> </div>
        <div class="blt2__back face"> </div>
        <div class="blt2__right face"> </div>
        <div class="blt2__left face"> </div>
        <div class="blt2__top face"> </div>
        <div class="blt2__bottom face"> </div>
      </div>
      <div class="blb">
        <div class="blb__front face"> </div>
        <div class="blb__back face"> </div>
        <div class="blb__right face"> </div>
        <div class="blb__left face"> </div>
        <div class="blb__top face"> </div>
        <div class="blb__bottom face"> </div>
      </div>
      <div class="blb2">
        <div class="blb2__front face"> </div>
        <div class="blb2__back face"> </div>
        <div class="blb2__right face"> </div>
        <div class="blb2__left face"> </div>
        <div class="blb2__top face"> </div>
        <div class="blb2__bottom face"> </div>
      </div>
      <div class="puerta-c">
        <div class="puerta">
          <div class="puerta__front face"> </div>
          <div class="puerta__back face"> </div>
          <div class="puerta__right face"> </div>
          <div class="puerta__left face"> </div>
          <div class="puerta__top face"> </div>
          <div class="puerta__bottom face"> </div>
        </div>
        <div class="puerta-l">
          <div class="puerta-l__front face"> </div>
          <div class="puerta-l__back face"> </div>
          <div class="puerta-l__right face"> </div>
          <div class="puerta-l__left face"> </div>
          <div class="puerta-l__top face"> </div>
          <div class="puerta-l__bottom face"> </div>
        </div>
        <div class="puerta-r">
          <div class="puerta-r__front face"> </div>
          <div class="puerta-r__back face"> </div>
          <div class="puerta-r__right face"> </div>
          <div class="puerta-r__left face"> </div>
          <div class="puerta-r__top face"> </div>
          <div class="puerta-r__bottom face"> </div>
        </div>
        <div class="puerta-t">
          <div class="puerta-t__front face"> </div>
          <div class="puerta-t__back face"> </div>
          <div class="puerta-t__right face"> </div>
          <div class="puerta-t__left face"> </div>
          <div class="puerta-t__top face"> </div>
          <div class="puerta-t__bottom face"> </div>
        </div>
      </div>
      <div class="cuadro-l">
        <div class="cuadro-l__front face"> </div>
        <div class="cuadro-l__back face"> </div>
        <div class="cuadro-l__right face"> </div>
        <div class="cuadro-l__left face"> </div>
        <div class="cuadro-l__top face"> </div>
        <div class="cuadro-l__bottom face"> </div>
      </div>
      <div class="cuadro-r">
        <div class="cuadro-r__front face"> </div>
        <div class="cuadro-r__back face"> </div>
        <div class="cuadro-r__right face"> </div>
        <div class="cuadro-r__left face"> </div>
        <div class="cuadro-r__top face"> </div>
        <div class="cuadro-r__bottom face"> </div>
      </div>
      <div class="librero">
        <div class="librero__front face"> </div>
        <div class="librero__back face"> </div>
        <div class="librero__right face"> </div>
        <div class="librero__left face"> </div>
        <div class="librero__top face"> </div>
        <div class="librero__bottom face"> </div>
      </div>
      <div class="libros">
        <div class="libro">
          <div class="libro__front face"> </div>
          <div class="libro__back face"> </div>
          <div class="libro__right face"> </div>
          <div class="libro__left face"> </div>
          <div class="libro__top face"> </div>
          <div class="libro__bottom face"> </div>
        </div>
        <div class="libro">
          <div class="libro__front face"> </div>
          <div class="libro__back face"> </div>
          <div class="libro__right face"> </div>
          <div class="libro__left face"> </div>
          <div class="libro__top face"> </div>
          <div class="libro__bottom face"> </div>
        </div>
        <div class="libro">
          <div class="libro__front face"> </div>
          <div class="libro__back face"> </div>
          <div class="libro__right face"> </div>
          <div class="libro__left face"> </div>
          <div class="libro__top face"> </div>
          <div class="libro__bottom face"> </div>
        </div>
        <div class="libro">
          <div class="libro__front face"> </div>
          <div class="libro__back face"> </div>
          <div class="libro__right face"> </div>
          <div class="libro__left face"> </div>
          <div class="libro__top face"> </div>
          <div class="libro__bottom face"> </div>
        </div>
        <div class="libro">
          <div class="libro__front face"> </div>
          <div class="libro__back face"> </div>
          <div class="libro__right face"> </div>
          <div class="libro__left face"> </div>
          <div class="libro__top face"> </div>
          <div class="libro__bottom face"> </div>
        </div>
        <div class="libro">
          <div class="libro__front face"> </div>
          <div class="libro__back face"> </div>
          <div class="libro__right face"> </div>
          <div class="libro__left face"> </div>
          <div class="libro__top face"> </div>
          <div class="libro__bottom face"> </div>
        </div>
      </div>
      <div class="fotos">
        <div class="foto">
          <div class="foto__front face"> </div>
          <div class="foto__back face"> </div>
          <div class="foto__right face"> </div>
          <div class="foto__left face"> </div>
          <div class="foto__top face"> </div>
          <div class="foto__bottom face"> </div>
        </div>
        <div class="foto">
          <div class="foto__front face"> </div>
          <div class="foto__back face"> </div>
          <div class="foto__right face"> </div>
          <div class="foto__left face"> </div>
          <div class="foto__top face"> </div>
          <div class="foto__bottom face"> </div>
        </div>
      </div>
      <div class="cajas">
        <div class="caja">
          <div class="caja__front face"> </div>
          <div class="caja__back face"> </div>
          <div class="caja__right face"> </div>
          <div class="caja__left face"> </div>
          <div class="caja__top face"> </div>
          <div class="caja__bottom face"> </div>
        </div>
        <div class="caja">
          <div class="caja__front face"> </div>
          <div class="caja__back face"> </div>
          <div class="caja__right face"> </div>
          <div class="caja__left face"> </div>
          <div class="caja__top face"> </div>
          <div class="caja__bottom face"> </div>
        </div>
        <div class="caja">
          <div class="caja__front face"> </div>
          <div class="caja__back face"> </div>
          <div class="caja__right face"> </div>
          <div class="caja__left face"> </div>
          <div class="caja__top face"> </div>
          <div class="caja__bottom face"> </div>
        </div>
      </div>
      <div class="tv">
        <div class="tv__front face"> </div>
        <div class="tv__back face"> </div>
        <div class="tv__right face"> </div>
        <div class="tv__left face"> </div>
        <div class="tv__top face"> </div>
        <div class="tv__bottom face"> </div>
      </div>
      <div class="repisa-t">
        <div class="repisa-t__front face"> </div>
        <div class="repisa-t__back face"> </div>
        <div class="repisa-t__right face"> </div>
        <div class="repisa-t__left face"> </div>
        <div class="repisa-t__top face"> </div>
        <div class="repisa-t__bottom face"> </div>
      </div>
      <div class="repisa-b">
        <div class="repisa-b__front face"> </div>
        <div class="repisa-b__back face"> </div>
        <div class="repisa-b__right face"> </div>
        <div class="repisa-b__left face"> </div>
        <div class="repisa-b__top face"> </div>
        <div class="repisa-b__bottom face"> </div>
      </div>
      <div class="bocina-l">
        <div class="bocina-l__front face"> </div>
        <div class="bocina-l__back face"> </div>
        <div class="bocina-l__right face"> </div>
        <div class="bocina-l__left face"> </div>
        <div class="bocina-l__top face"> </div>
        <div class="bocina-l__bottom face"> </div>
      </div>
      <div class="bocina-r">
        <div class="bocina-r__front face"> </div>
        <div class="bocina-r__back face"> </div>
        <div class="bocina-r__right face"> </div>
        <div class="bocina-r__left face"> </div>
        <div class="bocina-r__top face"> </div>
        <div class="bocina-r__bottom face"> </div>
      </div>
      <div class="muro">
        <div class="muro__front face"> </div>
        <div class="muro__back face"> </div>
        <div class="muro__right face"> </div>
        <div class="muro__left face"> </div>
        <div class="muro__top face"> </div>
        <div class="muro__bottom face"> </div>
      </div>
      <div class="sillon-c">
        <div class="sillon-b">
          <div class="sillon-b__front face"> </div>
          <div class="sillon-b__back face"> </div>
          <div class="sillon-b__right face"> </div>
          <div class="sillon-b__left face"> </div>
          <div class="sillon-b__top face"> </div>
          <div class="sillon-b__bottom face"> </div>
        </div>
        <div class="sillon-t">
          <div class="sillon-t__front face"> </div>
          <div class="sillon-t__back face"> </div>
          <div class="sillon-t__right face"> </div>
          <div class="sillon-t__left face"> </div>
          <div class="sillon-t__top face"> </div>
          <div class="sillon-t__bottom face"> </div>
        </div>
        <div class="sillon-l">
          <div class="sillon-l__front face"> </div>
          <div class="sillon-l__back face"> </div>
          <div class="sillon-l__right face"> </div>
          <div class="sillon-l__left face"> </div>
          <div class="sillon-l__top face"> </div>
          <div class="sillon-l__bottom face"> </div>
        </div>
        <div class="sillon-r">
          <div class="sillon-r__front face"> </div>
          <div class="sillon-r__back face"> </div>
          <div class="sillon-r__right face"> </div>
          <div class="sillon-r__left face"> </div>
          <div class="sillon-r__top face"> </div>
          <div class="sillon-r__bottom face"> </div>
        </div>
      </div>
      <div class="mesa-c">
        <div class="mesa">
          <div class="mesa__front face"> </div>
          <div class="mesa__back face"> </div>
          <div class="mesa__right face"> </div>
          <div class="mesa__left face"> </div>
          <div class="mesa__top face"> </div>
          <div class="mesa__bottom face"> </div>
        </div>
        <div class="mesa-p">
          <div class="mesa-p__front face"> </div>
          <div class="mesa-p__back face"> </div>
          <div class="mesa-p__right face"> </div>
          <div class="mesa-p__left face"> </div>
          <div class="mesa-p__top face"> </div>
          <div class="mesa-p__bottom face"> </div>
        </div>
        <div class="mesa-p">
          <div class="mesa-p__front face"> </div>
          <div class="mesa-p__back face"> </div>
          <div class="mesa-p__right face"> </div>
          <div class="mesa-p__left face"> </div>
          <div class="mesa-p__top face"> </div>
          <div class="mesa-p__bottom face"> </div>
        </div>
        <div class="mesa-p">
          <div class="mesa-p__front face"> </div>
          <div class="mesa-p__back face"> </div>
          <div class="mesa-p__right face"> </div>
          <div class="mesa-p__left face"> </div>
          <div class="mesa-p__top face"> </div>
          <div class="mesa-p__bottom face"> </div>
        </div>
        <div class="mesa-p">
          <div class="mesa-p__front face"> </div>
          <div class="mesa-p__back face"> </div>
          <div class="mesa-p__right face"> </div>
          <div class="mesa-p__left face"> </div>
          <div class="mesa-p__top face"> </div>
          <div class="mesa-p__bottom face"> </div>
        </div>
        <div class="mesa-shadow"></div>
      </div>
      <div class="tablet">
        <div class="tablet__front face"> </div>
        <div class="tablet__back face"> </div>
        <div class="tablet__right face"> </div>
        <div class="tablet__left face"> </div>
        <div class="tablet__top face"> </div>
        <div class="tablet__bottom face"> </div>
      </div>
    </div>
  );
}

export default HomeRoomComponent;