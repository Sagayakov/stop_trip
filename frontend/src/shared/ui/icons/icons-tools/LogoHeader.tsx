import { useNavigate } from "react-router-dom"

export const LogoHeader = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/');
        window.scrollTo(0, 0);
    }

    return (
        <svg
            style={{cursor: 'pointer'}}
            id="logo"
            width="134"
            height="40"
            viewBox="0 0 134 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={handleClick}>
            <path
                d="M16.6667 30V25C16.6667 24.116 17.0179 23.2681 17.643 22.643C18.2681 22.0179 19.116 21.6667 20 21.6667C20.8841 21.6667 21.7319 22.0179 22.3571 22.643C22.9822 23.2681 23.3334 24.116 23.3334 25V30M3.33337 13.3333L19.5534 5.22334C19.6921 5.15409 19.845 5.11804 20 5.11804C20.1551 5.11804 20.308 5.15409 20.4467 5.22334L36.6667 13.3333"
                stroke="#1C1C1E"
                strokeWidth="3.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M33.3334 18.3333V31.6666C33.3334 32.5507 32.9822 33.3985 32.357 34.0237C31.7319 34.6488 30.8841 35 30 35H10C9.11597 35 8.26812 34.6488 7.643 34.0237C7.01788 33.3985 6.66669 32.5507 6.66669 31.6666V18.3333"
                stroke="#1C1C1E"
                strokeWidth="3.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M59.1548 8.63778C59.098 8.06487 58.8542 7.61979 58.4233 7.30256C57.9924 6.98532 57.4077 6.8267 56.669 6.8267C56.1671 6.8267 55.7434 6.89773 55.3977 7.03977C55.0521 7.17708 54.7869 7.36884 54.6023 7.61506C54.4223 7.86127 54.3324 8.14062 54.3324 8.45312C54.3229 8.71354 54.3774 8.94081 54.4957 9.13494C54.6188 9.32907 54.7869 9.49716 55 9.6392C55.2131 9.77651 55.4593 9.89725 55.7386 10.0014C56.018 10.1009 56.3163 10.1861 56.6335 10.2571L57.9403 10.5696C58.5748 10.7116 59.1572 10.901 59.6875 11.1378C60.2178 11.3745 60.6771 11.6657 61.0653 12.0114C61.4536 12.357 61.7543 12.7642 61.9673 13.233C62.1851 13.7017 62.2964 14.2391 62.3011 14.8452C62.2964 15.7353 62.0691 16.5071 61.6193 17.1605C61.1742 17.8092 60.5303 18.3134 59.6875 18.6733C58.8494 19.0284 57.8385 19.206 56.6548 19.206C55.4806 19.206 54.4579 19.026 53.5866 18.6662C52.7202 18.3063 52.0431 17.7737 51.5554 17.0682C51.0724 16.358 50.8191 15.4796 50.7955 14.4332H53.7713C53.8045 14.9209 53.9441 15.3281 54.1903 15.6548C54.4413 15.9768 54.7751 16.2206 55.1918 16.3864C55.6132 16.5473 56.089 16.6278 56.6193 16.6278C57.1402 16.6278 57.5923 16.5521 57.9759 16.4006C58.3641 16.2491 58.6648 16.0384 58.8778 15.7685C59.0909 15.4986 59.1974 15.1884 59.1974 14.8381C59.1974 14.5114 59.1004 14.2367 58.9062 14.0142C58.7169 13.7917 58.4375 13.6023 58.0682 13.446C57.7036 13.2898 57.2562 13.1477 56.7259 13.0199L55.142 12.6222C53.9157 12.3239 52.9474 11.8575 52.2372 11.223C51.527 10.5885 51.1742 9.7339 51.179 8.65909C51.1742 7.77841 51.4086 7.009 51.8821 6.35085C52.3603 5.69271 53.0161 5.17898 53.8494 4.80966C54.6828 4.44034 55.6297 4.25568 56.6903 4.25568C57.7699 4.25568 58.7121 4.44034 59.517 4.80966C60.3267 5.17898 60.9564 5.69271 61.4062 6.35085C61.8561 7.009 62.0881 7.77131 62.1023 8.63778H59.1548ZM70.1154 8.09091V10.3636H63.5458V8.09091H70.1154ZM65.0373 5.47727H68.0629V15.6477C68.0629 15.9271 68.1055 16.1449 68.1907 16.3011C68.2759 16.4527 68.3943 16.5592 68.5458 16.6207C68.7021 16.6823 68.882 16.7131 69.0856 16.7131C69.2276 16.7131 69.3697 16.7012 69.5117 16.6776C69.6538 16.6491 69.7627 16.6278 69.8384 16.6136L70.3143 18.8651C70.1628 18.9124 69.9497 18.9669 69.6751 19.0284C69.4004 19.0947 69.0666 19.1349 68.6737 19.1491C67.9445 19.1776 67.3053 19.0805 66.756 18.858C66.2115 18.6354 65.7878 18.2898 65.4847 17.821C65.1817 17.3523 65.0326 16.7604 65.0373 16.0455V5.47727ZM76.8981 19.2131C75.7949 19.2131 74.8408 18.9787 74.0359 18.5099C73.2357 18.0365 72.6178 17.3783 72.1822 16.5355C71.7466 15.688 71.5288 14.7055 71.5288 13.5881C71.5288 12.4612 71.7466 11.4763 72.1822 10.6335C72.6178 9.78598 73.2357 9.12784 74.0359 8.65909C74.8408 8.18561 75.7949 7.94886 76.8981 7.94886C78.0013 7.94886 78.953 8.18561 79.7532 8.65909C80.5581 9.12784 81.1784 9.78598 81.614 10.6335C82.0496 11.4763 82.2674 12.4612 82.2674 13.5881C82.2674 14.7055 82.0496 15.688 81.614 16.5355C81.1784 17.3783 80.5581 18.0365 79.7532 18.5099C78.953 18.9787 78.0013 19.2131 76.8981 19.2131ZM76.9123 16.8693C77.4142 16.8693 77.8332 16.7273 78.1694 16.4432C78.5056 16.1544 78.7589 15.7614 78.9293 15.2642C79.1045 14.767 79.1921 14.2012 79.1921 13.5668C79.1921 12.9323 79.1045 12.3665 78.9293 11.8693C78.7589 11.3722 78.5056 10.9792 78.1694 10.6903C77.8332 10.4015 77.4142 10.2571 76.9123 10.2571C76.4057 10.2571 75.9795 10.4015 75.6339 10.6903C75.293 10.9792 75.0349 11.3722 74.8597 11.8693C74.6893 12.3665 74.604 12.9323 74.604 13.5668C74.604 14.2012 74.6893 14.767 74.8597 15.2642C75.0349 15.7614 75.293 16.1544 75.6339 16.4432C75.9795 16.7273 76.4057 16.8693 76.9123 16.8693ZM84.2347 23.0909V8.09091H87.2177V9.9233H87.3526C87.4852 9.62973 87.677 9.33144 87.9279 9.02841C88.1836 8.72064 88.515 8.46496 88.9222 8.26136C89.3342 8.05303 89.8455 7.94886 90.4563 7.94886C91.2518 7.94886 91.9857 8.1572 92.658 8.57386C93.3304 8.9858 93.8678 9.60843 94.2702 10.4418C94.6727 11.2704 94.8739 12.3097 94.8739 13.5597C94.8739 14.7765 94.6774 15.804 94.2844 16.642C93.8962 17.4754 93.3659 18.1075 92.6935 18.5384C92.0259 18.9645 91.2778 19.1776 90.4492 19.1776C89.8621 19.1776 89.3626 19.0805 88.9506 18.8864C88.5434 18.6922 88.2096 18.4484 87.9492 18.1548C87.6888 17.8565 87.4899 17.5559 87.3526 17.2528H87.2603V23.0909H84.2347ZM87.1964 13.5455C87.1964 14.1941 87.2863 14.7599 87.4663 15.2429C87.6462 15.7259 87.9066 16.1023 88.2475 16.3722C88.5884 16.6373 89.0027 16.7699 89.4904 16.7699C89.9828 16.7699 90.3995 16.6349 90.7404 16.3651C91.0813 16.0904 91.3394 15.7116 91.5146 15.2287C91.6945 14.741 91.7844 14.1799 91.7844 13.5455C91.7844 12.9157 91.6969 12.3617 91.5217 11.8835C91.3465 11.4053 91.0884 11.0312 90.7475 10.7614C90.4066 10.4915 89.9876 10.3565 89.4904 10.3565C88.998 10.3565 88.5813 10.4867 88.2404 10.7472C87.9042 11.0076 87.6462 11.3769 87.4663 11.8551C87.2863 12.3333 87.1964 12.8968 87.1964 13.5455ZM95.593 6.99006V4.45455H107.539V6.99006H103.086V19H100.046V6.99006H95.593ZM108.317 19V8.09091H111.25V9.99432H111.364C111.563 9.31723 111.896 8.80587 112.365 8.46023C112.834 8.10985 113.374 7.93466 113.984 7.93466C114.136 7.93466 114.299 7.94413 114.474 7.96307C114.65 7.98201 114.804 8.00805 114.936 8.04119V10.7259C114.794 10.6832 114.598 10.6454 114.347 10.6122C114.096 10.5791 113.866 10.5625 113.658 10.5625C113.213 10.5625 112.815 10.6596 112.464 10.8537C112.119 11.0431 111.844 11.3082 111.641 11.6491C111.442 11.9901 111.342 12.383 111.342 12.8281V19H108.317ZM116.5 19V8.09091H119.526V19H116.5ZM118.02 6.68466C117.57 6.68466 117.185 6.53551 116.863 6.23722C116.545 5.93419 116.387 5.57197 116.387 5.15057C116.387 4.7339 116.545 4.37642 116.863 4.07812C117.185 3.77509 117.57 3.62358 118.02 3.62358C118.47 3.62358 118.854 3.77509 119.171 4.07812C119.493 4.37642 119.654 4.7339 119.654 5.15057C119.654 5.57197 119.493 5.93419 119.171 6.23722C118.854 6.53551 118.47 6.68466 118.02 6.68466ZM121.95 23.0909V8.09091H124.933V9.9233H125.067C125.2 9.62973 125.392 9.33144 125.643 9.02841C125.898 8.72064 126.23 8.46496 126.637 8.26136C127.049 8.05303 127.56 7.94886 128.171 7.94886C128.967 7.94886 129.701 8.1572 130.373 8.57386C131.045 8.9858 131.583 9.60843 131.985 10.4418C132.388 11.2704 132.589 12.3097 132.589 13.5597C132.589 14.7765 132.392 15.804 131.999 16.642C131.611 17.4754 131.081 18.1075 130.408 18.5384C129.741 18.9645 128.993 19.1776 128.164 19.1776C127.577 19.1776 127.077 19.0805 126.665 18.8864C126.258 18.6922 125.924 18.4484 125.664 18.1548C125.404 17.8565 125.205 17.5559 125.067 17.2528H124.975V23.0909H121.95ZM124.911 13.5455C124.911 14.1941 125.001 14.7599 125.181 15.2429C125.361 15.7259 125.621 16.1023 125.962 16.3722C126.303 16.6373 126.718 16.7699 127.205 16.7699C127.698 16.7699 128.114 16.6349 128.455 16.3651C128.796 16.0904 129.054 15.7116 129.229 15.2287C129.409 14.741 129.499 14.1799 129.499 13.5455C129.499 12.9157 129.412 12.3617 129.237 11.8835C129.061 11.4053 128.803 11.0312 128.462 10.7614C128.121 10.4915 127.702 10.3565 127.205 10.3565C126.713 10.3565 126.296 10.4867 125.955 10.7472C125.619 11.0076 125.361 11.3769 125.181 11.8551C125.001 12.3333 124.911 12.8968 124.911 13.5455Z"
                fill="#1C1C1E"
            />
            <path
                d="M55.9659 30.1847L54.5597 30.3381C54.5199 30.196 54.4503 30.0625 54.3509 29.9375C54.2543 29.8125 54.1236 29.7116 53.9588 29.6349C53.794 29.5582 53.5923 29.5199 53.3537 29.5199C53.0327 29.5199 52.7628 29.5895 52.544 29.7287C52.3281 29.8679 52.2216 30.0483 52.2244 30.2699C52.2216 30.4602 52.2912 30.6151 52.4332 30.7344C52.5781 30.8537 52.8168 30.9517 53.1491 31.0284L54.2656 31.267C54.8849 31.4006 55.3452 31.6122 55.6463 31.902C55.9503 32.1918 56.1037 32.571 56.1065 33.0398C56.1037 33.4517 55.983 33.8153 55.7443 34.1307C55.5085 34.4432 55.1804 34.6875 54.7599 34.8636C54.3395 35.0398 53.8565 35.1278 53.3111 35.1278C52.5099 35.1278 51.8651 34.9602 51.3764 34.625C50.8878 34.2869 50.5966 33.8168 50.5028 33.2145L52.0071 33.0696C52.0753 33.3651 52.2202 33.5881 52.4418 33.7386C52.6634 33.8892 52.9517 33.9645 53.3068 33.9645C53.6733 33.9645 53.9673 33.8892 54.1889 33.7386C54.4134 33.5881 54.5256 33.402 54.5256 33.1804C54.5256 32.9929 54.4531 32.8381 54.3082 32.7159C54.1662 32.5937 53.9446 32.5 53.6435 32.4347L52.527 32.2003C51.8991 32.0696 51.4347 31.8494 51.1335 31.5398C50.8324 31.2273 50.6832 30.8324 50.6861 30.3551C50.6832 29.9517 50.7926 29.6023 51.0142 29.3068C51.2386 29.0085 51.5497 28.7784 51.9474 28.6165C52.348 28.4517 52.8097 28.3693 53.3324 28.3693C54.0994 28.3693 54.7031 28.5327 55.1435 28.8594C55.5866 29.1861 55.8608 29.6278 55.9659 30.1847ZM64.127 28.4545V29.6477H60.3642V28.4545H64.127ZM61.2932 26.8864H62.8358V33.0312C62.8358 33.2386 62.8671 33.3977 62.9296 33.5085C62.9949 33.6165 63.0801 33.6903 63.1853 33.7301C63.2904 33.7699 63.4068 33.7898 63.5347 33.7898C63.6313 33.7898 63.7193 33.7827 63.7989 33.7685C63.8813 33.7543 63.9438 33.7415 63.9864 33.7301L64.2463 34.9361C64.1639 34.9645 64.0461 34.9957 63.8926 35.0298C63.7421 35.0639 63.5574 35.0838 63.3387 35.0895C62.9523 35.1009 62.6043 35.0426 62.2946 34.9148C61.985 34.7841 61.7392 34.5824 61.5574 34.3097C61.3784 34.0369 61.2904 33.696 61.2932 33.2869V26.8864ZM70.7807 35.1321C70.3659 35.1321 69.9923 35.0582 69.6599 34.9105C69.3304 34.7599 69.069 34.5384 68.8758 34.2457C68.6855 33.9531 68.5903 33.5923 68.5903 33.1634C68.5903 32.794 68.6585 32.4886 68.7949 32.2472C68.9312 32.0057 69.1173 31.8125 69.3531 31.6676C69.5889 31.5227 69.8545 31.4134 70.15 31.3395C70.4483 31.2628 70.7565 31.2074 71.0747 31.1733C71.4582 31.1335 71.7693 31.098 72.0079 31.0668C72.2466 31.0327 72.4199 30.9815 72.5278 30.9134C72.6386 30.8423 72.694 30.733 72.694 30.5852V30.5597C72.694 30.2386 72.5988 29.9901 72.4085 29.8139C72.2182 29.6378 71.944 29.5497 71.5861 29.5497C71.2082 29.5497 70.9085 29.6321 70.6869 29.7969C70.4682 29.9616 70.3204 30.1562 70.2437 30.3807L68.8034 30.1761C68.917 29.7784 69.1045 29.446 69.3659 29.179C69.6273 28.9091 69.9469 28.7074 70.3247 28.5739C70.7025 28.4375 71.1202 28.3693 71.5775 28.3693C71.8929 28.3693 72.2068 28.4062 72.5193 28.4801C72.8318 28.554 73.1173 28.6761 73.3758 28.8466C73.6344 29.0142 73.8417 29.2429 73.998 29.5327C74.1571 29.8224 74.2366 30.1847 74.2366 30.6193V35H72.7537V34.1009H72.7025C72.6088 34.2827 72.4767 34.4531 72.3062 34.6122C72.1386 34.7685 71.927 34.8949 71.6713 34.9915C71.4185 35.0852 71.1216 35.1321 70.7807 35.1321ZM71.1812 33.9986C71.4909 33.9986 71.7594 33.9375 71.9866 33.8153C72.2139 33.6903 72.3886 33.5256 72.5108 33.321C72.6358 33.1165 72.6983 32.8935 72.6983 32.652V31.8807C72.65 31.9205 72.5676 31.9574 72.4511 31.9915C72.3375 32.0256 72.2096 32.0554 72.0676 32.081C71.9256 32.1065 71.7849 32.1293 71.6457 32.1491C71.5065 32.169 71.3858 32.1861 71.2835 32.2003C71.0534 32.2315 70.8474 32.2827 70.6656 32.3537C70.4838 32.4247 70.3403 32.5241 70.2352 32.652C70.1301 32.777 70.0775 32.9389 70.0775 33.1378C70.0775 33.4219 70.1812 33.6364 70.3886 33.7812C70.596 33.9261 70.8602 33.9986 71.1812 33.9986ZM79.2678 35V28.4545H80.7635V29.5455H80.8317C80.951 29.1676 81.1556 28.8764 81.4453 28.6719C81.7379 28.4645 82.0717 28.3608 82.4467 28.3608C82.532 28.3608 82.6271 28.3651 82.7323 28.3736C82.8402 28.3793 82.9297 28.3892 83.0007 28.4034V29.8224C82.9354 29.7997 82.8317 29.7798 82.6896 29.7628C82.5504 29.7429 82.4155 29.733 82.2848 29.733C82.0036 29.733 81.7507 29.794 81.5263 29.9162C81.3047 30.0355 81.13 30.2017 81.0021 30.4148C80.8743 30.6278 80.8104 30.8736 80.8104 31.152V35H79.2678ZM91.1256 28.4545V29.6477H87.3628V28.4545H91.1256ZM88.2918 26.8864H89.8344V33.0312C89.8344 33.2386 89.8657 33.3977 89.9282 33.5085C89.9935 33.6165 90.0787 33.6903 90.1838 33.7301C90.289 33.7699 90.4054 33.7898 90.5333 33.7898C90.6299 33.7898 90.7179 33.7827 90.7975 33.7685C90.8799 33.7543 90.9424 33.7415 90.985 33.7301L91.2449 34.9361C91.1625 34.9645 91.0446 34.9957 90.8912 35.0298C90.7407 35.0639 90.556 35.0838 90.3373 35.0895C89.9509 35.1009 89.6029 35.0426 89.2932 34.9148C88.9836 34.7841 88.7378 34.5824 88.556 34.3097C88.377 34.0369 88.289 33.696 88.2918 33.2869V26.8864ZM103.895 26.2727V35H102.352V26.2727H103.895ZM108.961 35V28.4545H110.504V35H108.961ZM109.737 27.5256C109.492 27.5256 109.282 27.4446 109.106 27.2827C108.93 27.1179 108.842 26.9205 108.842 26.6903C108.842 26.4574 108.93 26.2599 109.106 26.098C109.282 25.9332 109.492 25.8509 109.737 25.8509C109.984 25.8509 110.194 25.9332 110.367 26.098C110.544 26.2599 110.632 26.4574 110.632 26.6903C110.632 26.9205 110.544 27.1179 110.367 27.2827C110.194 27.4446 109.984 27.5256 109.737 27.5256ZM121.417 28.4545L119.086 35H117.381L115.05 28.4545H116.695L118.199 33.3168H118.268L119.776 28.4545H121.417ZM128.639 35.1278C127.983 35.1278 127.416 34.9915 126.939 34.7188C126.465 34.4432 126.099 34.054 125.844 33.5511C125.588 33.0455 125.46 32.4503 125.46 31.7656C125.46 31.0923 125.588 30.5014 125.844 29.9929C126.102 29.4815 126.463 29.0838 126.926 28.7997C127.389 28.5128 127.933 28.3693 128.558 28.3693C128.962 28.3693 129.342 28.4347 129.7 28.5653C130.061 28.6932 130.379 28.892 130.655 29.1619C130.933 29.4318 131.152 29.7756 131.311 30.1932C131.47 30.608 131.55 31.1023 131.55 31.6761V32.1491H126.185V31.1094H130.071C130.068 30.8139 130.004 30.5511 129.879 30.321C129.754 30.0881 129.58 29.9048 129.355 29.7713C129.134 29.6378 128.875 29.571 128.58 29.571C128.264 29.571 127.987 29.6477 127.749 29.8011C127.51 29.9517 127.324 30.1506 127.19 30.3977C127.06 30.642 126.993 30.9105 126.99 31.2031V32.1108C126.99 32.4915 127.06 32.8182 127.199 33.0909C127.338 33.3608 127.533 33.5682 127.783 33.7131C128.033 33.8551 128.325 33.9261 128.661 33.9261C128.885 33.9261 129.088 33.8949 129.27 33.8324C129.452 33.767 129.609 33.6719 129.743 33.5469C129.876 33.4219 129.977 33.267 130.045 33.0824L131.486 33.2443C131.395 33.625 131.222 33.9574 130.966 34.2415C130.713 34.5227 130.389 34.7415 129.994 34.8977C129.599 35.0511 129.148 35.1278 128.639 35.1278Z"
                fill="#1C1C1E"
            />
        </svg>
    )
}
