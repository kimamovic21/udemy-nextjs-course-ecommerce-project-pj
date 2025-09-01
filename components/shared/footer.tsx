const Footer = () => {
  return (
    <footer className='border-t border-dashed py-6'>
      <div className='container mx-auto text-sm text-muted-foreground text-center'>
        © {new Date().getFullYear()} Your Company. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;