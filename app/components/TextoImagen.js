"use client";

import Image from 'next/image';
import Link from 'next/link';

const TextoImagen = () => {
    return (
        <div className="container py-lg-5">
            <div className="row d-flex flex-column-reverse flex-lg-row">
                <div className="col-12 col-lg-6 pt-4 pt-lg-0">
                    <h2>Lorem Ipsum Dolor</h2>
                    <p className='mb-4'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </div>
                <div className="col-12 col-lg-6">
                    <Image src="/images/relax.png" alt="Imagen" className='img-fluid' width={437} height={623} />
                </div>
            </div>
        </div>
    );
}

export default TextoImagen;