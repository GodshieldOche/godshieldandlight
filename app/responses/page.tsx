// app/components/RSVPList.tsx
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import moment from "moment";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type RSVP = {
  id: number;
  created_at: string;
  full_name: string;
  phone_no: string;
  will_attend: boolean;
  message: string;
};

export default function RSVPList() {
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRSVPs = async () => {
      const { data, error } = await supabase
        .from("rsvp")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching RSVPs:", error.message);
      } else {
        setRsvps(data);
      }

      setLoading(false);
    };

    fetchRSVPs();
  }, [supabase]);

  if (loading) {
    return (
      <div className="text-center py-10 text-purple-600 text-xl">
        Loading RSVP list...
      </div>
    );
  }

  return (
    <section className="w-full py-12 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-8">
          RSVP Responses
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 bg-white shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-purple-700 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Index
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Full Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Phone Number
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Attendance
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Message
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Submitted
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rsvps.map((rsvp, index) => (
                <tr key={rsvp.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {rsvp.full_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {rsvp.phone_no}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-block text-xs font-medium px-3 py-1 rounded-full ${
                        rsvp.will_attend
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {rsvp.will_attend ? "Attending" : "Not Attending"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 italic">
                    {rsvp.message || "—"}
                  </td>
                  <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                    {moment(rsvp.created_at).format("ll")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
