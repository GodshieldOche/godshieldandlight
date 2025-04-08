"use client";
import React, { useState } from "react";
import Head from "next/head";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type FormData = {
  fullName: string;
  attending: boolean;
  guestCount: number;
  message: string;
  phone: string;
};

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    attending: false,
    guestCount: 0,
    message: "",
    phone: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({ ...formData, [name]: checked });
    } else if (name === "guestCount") {
      setFormData({ ...formData, [name]: parseInt(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   console.log("Form submitted:", formData);
  //   // Here you would typically send this data to your backend
  //   setSubmitted(true);
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from("rsvp").insert([
      {
        full_name: formData.fullName,
        phone_no: formData.phone,
        will_attend: formData.attending,
        addition: Number(formData.guestCount),
        message: formData.message,
      },
    ]);
    if (error) {
      alert("Error submitting RSVP");
      console.log(error);
    } else {
      setSubmitted(true);
      setFormData({
        fullName: "",
        attending: false,
        guestCount: 0,
        message: "",
        phone: "",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <Head>
        <title>Godshield & Light&apos;s Wedding | RSVP</title>
        <meta name="description" content="Wedding RSVP page" />
        <link rel="icon" href="/favicon.ico" />
        {/* Import elegant Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Great+Vibes&family=Montserrat:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div
        className="w-full bg-cover bg-center h-96 relative"
        style={{ backgroundImage: "url('/wedding-background.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center px-5">
          <div className="text-center text-white">
            <h1
              className="text-6xl mb-6"
              style={{ fontFamily: "'Great Vibes', cursive" }}
            >
              Godshield & Light
            </h1>
            <p
              className="text-2xl font-light"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              We&apos;re getting married!
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {!submitted ? (
          <>
            <div className="text-center mb-12">
              <h2
                className="text-2xl font-medium text-purple-800 mb-8"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Join Us On Our Special Day
              </h2>

              {/* Redesigned event details section */}
              <div className="relative py-12 px-8 mb-16 overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-300 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-300 to-transparent"></div>
                <div className="absolute top-2 left-2 w-16 h-16 border-t-2 border-l-2 border-purple-200"></div>
                <div className="absolute bottom-2 right-2 w-16 h-16 border-b-2 border-r-2 border-purple-200"></div>

                {/* Main content container */}
                <div className="flex flex-col md:flex-row justify-center items-center md:items-stretch gap-8">
                  {/* Date card */}
                  <div className="w-64 bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105">
                    <div className="bg-purple-900 text-white py-3 text-center">
                      <h3
                        className="uppercase tracking-wider text-sm font-medium"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        WHEN
                      </h3>
                    </div>
                    <div className="p-5 text-center">
                      <div
                        className="text-4xl font-bold text-purple-800 mb-1"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        10
                      </div>
                      <div
                        className="text-xl text-purple-700 mb-2"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                      >
                        May 2025
                      </div>
                      <div
                        className="inline-block px-4 py-1 rounded-full bg-purple-100 text-purple-800 text-sm mb-2"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        Saturday
                      </div>
                      <div
                        className="mt-3 text-gray-600"
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: "1.1rem",
                        }}
                      >
                        11:00 AM
                      </div>
                    </div>
                  </div>

                  {/* Venue card */}
                  <div className="w-64 bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105">
                    <div className="bg-purple-900 text-white py-3 text-center">
                      <h3
                        className="uppercase tracking-wider text-sm font-medium"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        WHERE
                      </h3>
                    </div>
                    <div className="p-5 text-center">
                      <div
                        className="text-xl font-bold text-purple-800 mb-2"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        Bahamas Event Center
                      </div>
                      <div
                        className="text-gray-600 mb-3"
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: "1.1rem",
                        }}
                      >
                        1080 Joseph Gomwalk St,
                        <br />
                        Gudu, Abuja
                      </div>
                      <a
                        href="https://www.google.com/maps?s=web&lqi=ChRiYWhhbWFzIGV2ZW50IGNlbnRlckiR9JPMmq6AgAhaLBAAEAEQAhgAGAEYAiIUYmFoYW1hcyBldmVudCBjZW50ZXIqCAgCEAAQARACkgELZXZlbnRfdmVudWWqAT0QATIfEAEiGwHoXVNVwujaxvbrcBLvpjUFX2QK-7gNKqpTqTIYEAIiFGJhaGFtYXMgZXZlbnQgY2VudGVy&vet=12ahUKEwjck_6xx7uMAxUiUkEAHfgdGZwQ1YkKegQIJRAB..i&cs=1&um=1&ie=UTF-8&fb=1&gl=ng&sa=X&geocode=KRf7VlXyDE4QMVScu6KhrF0a&daddr=2F5F%2B789,+1080+Joseph+Gomwalk+St,+Gudu,+Abuja+900104,+Federal+Capital+Territory"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-2 px-4 py-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-colors text-sm"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        View Map
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <h3
                className="text-2xl text-purple-800 mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Colours of the day
              </h3>

              <div className="flex justify-center gap-3 mb-10">
                <div className="w-12 h-12 rounded-full bg-purple-900"></div>
                <div className="w-12 h-12 rounded-full bg-purple-600"></div>
                <div className="w-12 h-12 rounded-full bg-purple-300"></div>
                <div className="w-12 h-12 rounded-full bg-white border border-gray-300"></div>
              </div>

              <div className="mb-8">
                <p
                  className="text-gray-600 text-base font-medium mb-4"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  We request the honor of your presence as we celebrate our
                  union. Please RSVP by April 30, 2025.
                </p>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <div className="mb-4">
                <label
                  htmlFor="fullName"
                  className="block text-gray-600 mb-2"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-purple-400 placeholder:text-gray-400 border-gray-200 text-gray-600"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.1rem",
                  }}
                  placeholder="Full Name"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-600 mb-2"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-purple-400 placeholder:text-gray-400 border-gray-200 text-gray-600"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.1rem",
                  }}
                  placeholder="Phone Number"
                  required
                />
              </div>

              <div className="mb-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="attending"
                    name="attending"
                    checked={formData.attending}
                    onChange={handleChange}
                    className="mr-2 h-5 w-5 text-purple-600"
                  />
                  <label
                    htmlFor="attending"
                    className="text-gray-600"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    I will attend
                  </label>
                </div>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block text-gray-600 mb-2"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Message to the Couple (Optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-purple-400 placeholder:text-gray-400 border-gray-200 text-gray-600"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.1rem",
                  }}
                  placeholder="Share your wishes or thoughts..."
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="bg-purple-700 cursor-pointer text-white px-8 py-3 rounded-md hover:bg-purple-800 transition duration-300 shadow-md"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    letterSpacing: "1px",
                  }}
                >
                  Submit RSVP
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="text-center bg-white p-8 rounded-lg shadow-lg">
            <div className="text-5xl text-purple-700 mb-4">✓</div>
            <h3
              className="text-2xl text-purple-800 mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Thank You!
            </h3>
            <p
              className="text-gray-600 mb-6"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.1rem",
              }}
            >
              Your RSVP has been submitted. We&apos;re looking forward to
              celebrating with you!
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="text-purple-700 underline hover:text-purple-900"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Back to RSVP Form
            </button>
          </div>
        )}

        <div className="mt-16 text-center">
          <h3
            className="text-2xl text-purple-800 mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Contact Information
          </h3>
          <div className="flex justify-center space-x-12">
            <div>
              <p
                className="font-medium text-gray-600"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Osas
              </p>
              <p
                className="text-purple-900"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                +234 81 362 18321
              </p>
            </div>
            <div>
              <p
                className="font-medium text-gray-600"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Ayomide
              </p>
              <p
                className="text-purple-900"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                +234 80 672 10501
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h2
            className="text-2xl text-purple-800 mb-4 text-center"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Wishlist & Gift Preferences
          </h2>

          <p
            className="text-center text-gray-700 mb-8 max-w-2xl mx-auto"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.1rem",
            }}
          >
            Your presence is the greatest gift we could ask for! However, if you
            feel inclined to bless us further, our preferred gift is a{" "}
            <strong>cash gift</strong> 💖. For those who prefer to gift items,
            here are some ideas:
          </p>

          <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto text-gray-700">
            {[
              "Washing Machine",
              "Dinner set",
              "Non-stick cookware set",
              "Duvet & bedsheets",
              "Home décor items",
              "Vacuum cleaner",
              "Air fryer",
              "Toaster",
              "Blender",
              "Pressure Cooker",
              "Juicer",
              "Wine Glass Set",
              "Humidifier",
              "Kitchen Knife Set",
              "Basic Toolkit",
              "Table Spoons Forks",
              "1.5hp Air Conditioner",
              "SoundBar Bluetooth Speaker",
            ].map((item, i) => (
              <li
                key={i}
                className="bg-purple-50 border border-purple-200 rounded-lg px-6 py-4 shadow-sm"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <footer className="bg-purple-900 text-white py-6 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p
            className="text-2xl mb-2"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            Godshield & Light
          </p>
          <p
            className="text-purple-200"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            May 10, 2025
          </p>
        </div>
      </footer>
    </div>
  );
}
