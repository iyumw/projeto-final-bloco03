import { GithubLogo, InstagramLogo, LinkedinLogo } from "@phosphor-icons/react";

function Footer() {
  let data = new Date().getFullYear();

  return (
    <div className="bottom-0 justify-center grid grid-rows-2 bg-gray-neutral p-4 text-sm w-full text-white">
      <p>© {data} Isis Okamoto. Todos os direitos reservados.</p>

      <ul className="flex justify-center gap-3">
        <li className="hover:text-purple-light transition duration-300 ease-in-out hover:-translate-y-1">
          <a href="https://linkedin.com/in/isis-okamoto" target="_blank">
            <LinkedinLogo size={29} />
          </a>
        </li>
        <li className="hover:text-purple-light transition duration-300 ease-in-out hover:-translate-y-1">
          <a href="https://github.com/iyumw" target="_blank">
            <GithubLogo size={29} />
          </a>
        </li>
        <li className="hover:text-purple-light transition duration-300 ease-in-out hover:-translate-y-1">
          <a href="https://instagram.com/_iyume" target="_blank">
            <InstagramLogo size={29} />
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Footer;
