const Footer = () => {
  return (
    <footer className='border-t border-dashed py-6'>
      <div className='container mx-auto text-sm text-muted-foreground text-center'>
        <span className='mr-1'>©</span>
        <span className='mr-1'>{new Date().getFullYear()}</span>
        <span className='mr-1'>Next E-Commerce</span>
        <span>All rights reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;