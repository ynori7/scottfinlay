export default function Footer() {
  return (
    <footer
      className="py-6 text-center"
      style={{ backgroundColor: '#222', color: '#777' }}
    >
      <div className="max-w-6xl mx-auto px-4">
        <span>
          Copyright &copy;{' '}
          <a
            href="http://www.scottfinlay.xyz/"
            className="hover:text-[#ee3030] transition-colors duration-200"
            style={{ color: '#777' }}
          >
            Scott Finlay
          </a>{' '}
          {new Date().getFullYear()}.
        </span>
      </div>
    </footer>
  );
}
