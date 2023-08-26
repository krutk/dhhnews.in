import React from "react";
import Select from "react-select";

const tags = [
  "Lafda",
  "Review",
  "Opinion",
  "Song",
  "Album/EP/Mixtape",
  "Views",
  "Interview",
  "Playlist",
  "Live Show",
];

const options = tags.map((tag) => ({
  label: tag,
  value: tag,
}));

const MultipleSelect = ({ onChange }: any) => {
  return (
    <Select
      isMulti
      options={options}
      onChange={onChange}
      placeholder="Select tags"
      className="react-select-container block w-full p-2 border rounded-md shadow-sm focus:outline-none focus:border-[#FF6D00] text-base text-gray-900"
      classNamePrefix="react-select"
    />
  );
};

export default MultipleSelect;
