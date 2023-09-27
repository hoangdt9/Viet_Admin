import React, { useState, useRef } from "react";
import { useEffect } from "react";

export const Captcha = ({ validate, loginClickStatus }) => {
  const [enteredVal, setEnteredVal] = useState("");
  const [captcha, setCaptcha] = useState("");
  const ref = useRef(null);

  const CANVAS_WIDTH = 120;
  const CANVAS_HEIGHT = 35;

  useEffect(() => {
    redraw();
  }, []);

  useEffect(() => {
    if (loginClickStatus != 1) onSubmitClicked();
  }, [loginClickStatus]);

  const drawCaptchaBackground = (ctx) => {
    // for (let x = 0; x < 3; x++)
    let p1 = Math.random() * 125;
    let p2 = Math.random() * 30;

    let hue = Math.random() * 360;

    ctx.beginPath();
    hue = Math.random() * 360;

    ctx.strokeStyle = `rgba(0,0,0,${hue})`;
    ctx.moveTo(0, 0);
    for (var xx = 0; xx < CANVAS_WIDTH; xx += 10 + 10 * Math.random()) {
      let yy =
        Math.random() > 0.5
          ? -3 - 2 * Math.random() + (CANVAS_HEIGHT / CANVAS_WIDTH) * xx
          : 3 + 2 * Math.random() + (CANVAS_HEIGHT / CANVAS_WIDTH) * xx;
      ctx.lineTo(xx, yy);
      // ctx.moveTo(xx, yy);
    }
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    hue = Math.random() * 360;
    // ctx.strokeStyle = `hsl(${hue},100%,50%)`;
    ctx.strokeStyle = `rgba(0,0,0,${hue})`;
    ctx.moveTo(CANVAS_WIDTH, 0);
    for (var xx = CANVAS_WIDTH; xx > 0; xx -= 10 + 10 * Math.random()) {
      let yy =
        Math.random() > 0.5
          ? -3 -
            2 * Math.random() -
            (CANVAS_HEIGHT / CANVAS_WIDTH) * xx +
            CANVAS_HEIGHT
          : 3 +
            2 * Math.random() -
            (CANVAS_HEIGHT / CANVAS_WIDTH) * xx +
            CANVAS_HEIGHT;
      ctx.lineTo(xx, yy);
      // ctx.moveTo(xx, yy);
    }
    ctx.stroke();
    ctx.closePath();
  };

  const drawCaptchaFace = (ctx) => {
    let x = 0;
    let y = 30;
    let str = "";
    for (let i = 0; i < 4; i++) {
      ctx.save();
      x = 10 + i * 25;

      let hue = Math.random() * 360;
      //   ctx.fillStyle = `hsl(${hue},50%,50%)`;
      ctx.fillStyle = `rgba(255,255,255,${hue})`;

      let fontSize = 0;
      do {
        fontSize = 30 + Math.random() * 4;
      } while (fontSize < 16);
      ctx.font = "bolder " + fontSize + "px Arial bold";

      ctx.translate(x, y);
      let rot = Math.random() * CANVAS_WIDTH;
      //   ctx.rotate((60 - rot) * (Math.PI / 180));
      ctx.translate(-x + 10, -y);
      let char = 0;
      do {
        char = Math.random() * 122;
      } while (
        // // Uppercase
        // !(char >= 65 && char <= 90) &&
        // // Lowercase
        // !(char >= 97 && char <= 122) &&
        // Numeric
        !(char >= 48 && char <= 57)
      );
      let ch = String.fromCharCode(char);
      str += ch;
      ctx.fillText(ch, x, y);
      ctx.strokeStyle = "black";
      ctx.lineWidth = 1.5;
      ctx.strokeText(ch, x, y);

      ctx.restore();
    }
    setCaptcha(str);
    // captcha = str;
  };

  const redraw = () => {
    let ctx = ref.current.getContext("2d");
    ctx.clearRect(0, 0, CANVAS_WIDTH, 50);
    ctx.fillStyle = "rgba(0,0,0,0)";
    ctx.fillRect(0, 0, CANVAS_WIDTH, 50);
    drawCaptchaBackground(ctx);
    drawCaptchaFace(ctx);
  };

  const onSubmitClicked = () => {
    validate && validate(enteredVal.toUpperCase() == captcha.toUpperCase());
  };

  const onResetClicked = () => {
    captcha = "";
    setEnteredVal("");
    redraw();
  };

  const getChar = () => {
    let str = "";
    let chap = [];
    for (let i = 0; i < 8; i++) {
      let item = {};
      let a = 0;
      do {
        a = Math.random() * 90;
      } while (a < 65);
      let char = String.fromCharCode(a);
      item.char = char;
      str += char;

      a = 0;
      do {
        a = Math.random() * 20;
      } while (a < 12);
      item.font = a;

      a = Math.random() * 120;
      item.rotation = a - 60;

      a = Math.random() * 360;
      item.hue = a;

      chap.push(
        <span
          style={{
            color: `hsl(${item.hue}deg,100%,50%)`,
            display: "inline-block",
            padding: "4px",
            fontSize: `${item.font}px`,
            transform: `rotate(${item.rotation}deg)`,
          }}
        >
          {item.char}
        </span>
      );
    }
    captcha = str;
    return chap;
  };

  return (
    <div
      className="border-y-2 border-[#DCDEE6]"
      style={{
        padding: "3px",
      }}
    >
      <div className="flex">
        <input
          className="focus:!outline-none text-[14px]"
          placeholder="Captcha"
          style={{
            width: "100px",
            boxSizing: "border-box",
            borderRadius: "3px",
          }}
          onChange={(e) => {
            setEnteredVal(e.target.value);
          }}
          value={enteredVal}
          type="text"
        />
        <canvas
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          style={{
            borderRadius: "3px",
          }}
          ref={ref}
        />
      </div>
    </div>
  );
};
