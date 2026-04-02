import { useMemo, useState } from "react";
import {
	GoabAppFooter,
	GoabAppFooterMetaSection,
	GoabAppFooterNavSection,
	GoabBadge,
	GoabBlock,
	GoabButton,
	GoabButtonGroup,
	GoabContainer,
	GoabDropdown,
	GoabDropdownItem,
	GoabFormItem,
	GoabInput,
	GoabLink,
	GoabMicrositeHeader,
	GoabNotification,
	GoabOneColumnLayout,
	GoabPageBlock,
	GoabText,
} from "@abgov/react-components";

type SearchItem = {
	id: number;
	title: string;
	description: string;
	category: string;
	audience: string;
	updated: string;
	popular?: boolean;
};

const services: SearchItem[] = [
	{
		id: 1,
		title: "Registry services",
		description:
			"Access motor vehicle, personal registry, business registry, and document services through Alberta registries.",
		category: "Registries",
		audience: "Albertans",
		updated: "Past 30 days",
		popular: true,
	},
	{
		id: 2,
		title: "Consumer protection and complaints",
		description:
			"Find information on refunds, complaint processes, consumer alerts, and marketplace protections.",
		category: "Consumer Services",
		audience: "Albertans",
		updated: "Past year",
		popular: true,
	},
	{
		id: 3,
		title: "Corporate registry",
		description:
			"Search, register, and manage corporations, trade names, and partnerships operating in Alberta.",
		category: "Business Services",
		audience: "Businesses",
		updated: "Past 6 months",
		popular: true,
	},
	{
		id: 4,
		title: "Land titles",
		description:
			"Search land title information, ownership documents, plans, and real estate related registrations.",
		category: "Land Titles",
		audience: "Businesses",
		updated: "Past 30 days",
		popular: true,
	},
	{
		id: 5,
		title: "Vital statistics",
		description:
			"Order birth, death, marriage, and legal change certificates and learn application requirements.",
		category: "Registries",
		audience: "Albertans",
		updated: "Past year",
	},
	{
		id: 6,
		title: "Forms and publications",
		description:
			"Browse public forms, guidance documents, and downloadable publications used by Service Alberta programs.",
		category: "Consumer Services",
		audience: "Non-profit Organizations",
		updated: "Past 6 months",
	},
	{
		id: 7,
		title: "Personal property registry",
		description:
			"Register and search financing statements, liens, and secured interests in personal property.",
		category: "Registries",
		audience: "Businesses",
		updated: "Past 30 days",
	},
	{
		id: 8,
		title: "Condominium and real estate",
		description:
			"Review condominium regulations, real estate practices, and related guidance for buyers and owners.",
		category: "Consumer Services",
		audience: "Albertans",
		updated: "Past 6 months",
	},
];

const quickLinks = [
	"Registry Services",
	"Personal Property Registry",
	"Corporate Registry",
	"Land Titles",
	"Condominium and Real Estate",
	"Consumer Protection",
	"Vital Statistics",
	"Forms and Publications",
];

export function App() {
	const [query, setQuery] = useState("");
	const [category, setCategory] = useState("All Categories");
	const [audience, setAudience] = useState("All Audiences");
	const [updated, setUpdated] = useState("Any time");

	const results = useMemo(() => {
		const normalized = query.trim().toLowerCase();

		return services.filter((item) => {
			const matchesQuery =
				normalized.length === 0 ||
				item.title.toLowerCase().includes(normalized) ||
				item.description.toLowerCase().includes(normalized) ||
				item.category.toLowerCase().includes(normalized);

			const matchesCategory =
				category === "All Categories" || item.category === category;
			const matchesAudience =
				audience === "All Audiences" || item.audience === audience;
			const matchesUpdated = updated === "Any time" || item.updated === updated;

			return matchesQuery && matchesCategory && matchesAudience && matchesUpdated;
		});
	}, [audience, category, query, updated]);

	function resetFilters() {
		setQuery("");
		setCategory("All Categories");
		setAudience("All Audiences");
		setUpdated("Any time");
	}

	return (
		<GoabOneColumnLayout>
			<section slot="header">
				<GoabMicrositeHeader type="live" />
			</section>

			<GoabPageBlock width="1000px">
				<div className="page-shell">
					<GoabBlock gap="2xl" direction="column">
						<section className="hero-copy">
							<GoabText size="heading-xl" mb="s">
								Service Alberta Search
							</GoabText>
							<GoabText size="body-l" colour="secondary" mb="none">
								A UI-components remake of your original redesign with a more structured
								search experience, consistent Alberta styling, and reusable form and
								content patterns.
							</GoabText>
						</section>

						<GoabContainer
							type="non-interactive"
							accent="thick"
							heading="Search provincial services, forms, and information"
						>
							<GoabBlock gap="xl" direction="column">
								<GoabFormItem
									label="Enter search terms"
									helpText="Use keywords to narrow down relevant government services and programs."
								>
									<GoabInput
										name="service-alberta-search"
										type="search"
										value={query}
										width="100%"
										leadingIcon="search"
										onChange={(detail: { value: string }) => setQuery(detail.value)}
									></GoabInput>
								</GoabFormItem>

								<div className="filter-grid">
									<GoabFormItem label="Category">
										<GoabDropdown
											name="category"
											value={category}
											width="100%"
											onChange={(detail: { value: string }) => setCategory(detail.value)}
										>
											<GoabDropdownItem value="All Categories" label="All Categories" />
											<GoabDropdownItem value="Consumer Services" label="Consumer Services" />
											<GoabDropdownItem value="Business Services" label="Business Services" />
											<GoabDropdownItem value="Land Titles" label="Land Titles" />
											<GoabDropdownItem value="Registries" label="Registries" />
										</GoabDropdown>
									</GoabFormItem>

									<GoabFormItem label="Audience">
										<GoabDropdown
											name="audience"
											value={audience}
											width="100%"
											onChange={(detail: { value: string }) => setAudience(detail.value)}
										>
											<GoabDropdownItem value="All Audiences" label="All Audiences" />
											<GoabDropdownItem value="Albertans" label="Albertans" />
											<GoabDropdownItem value="Businesses" label="Businesses" />
											<GoabDropdownItem
												value="Non-profit Organizations"
												label="Non-profit Organizations"
											/>
										</GoabDropdown>
									</GoabFormItem>

									<GoabFormItem label="Updated">
										<GoabDropdown
											name="updated"
											value={updated}
											width="100%"
											onChange={(detail: { value: string }) => setUpdated(detail.value)}
										>
											<GoabDropdownItem value="Any time" label="Any time" />
											<GoabDropdownItem value="Past 30 days" label="Past 30 days" />
											<GoabDropdownItem value="Past 6 months" label="Past 6 months" />
											<GoabDropdownItem value="Past year" label="Past year" />
										</GoabDropdown>
									</GoabFormItem>
								</div>

								<GoabButtonGroup alignment="start">
									<GoabButton trailingIcon="search">Search</GoabButton>
									<GoabButton type="secondary" onClick={resetFilters}>
										Reset
									</GoabButton>
								</GoabButtonGroup>
							</GoabBlock>
						</GoabContainer>

						<GoabNotification type="information" heading="Prototype note">
							This version keeps your original IA and content categories, but restyles
							the page with GoA UI components so it is easier to extend into a fuller
							search product later.
						</GoabNotification>

						<section>
							<GoabText size="heading-l" mb="m">
								Popular links
							</GoabText>
							<div className="quick-links-grid">
								{quickLinks.map((item) => (
									<GoabContainer
										key={item}
										type="interactive"
										accent="thin"
										heading={item}
									>
										<GoabText size="body-s" colour="secondary" mb="m">
											Commonly used Service Alberta entry point.
										</GoabText>
										<GoabLink trailingIcon="chevron-right">Open link</GoabLink>
									</GoabContainer>
								))}
							</div>
						</section>

						<section>
							<div className="results-header">
								<GoabText size="heading-l" mb="none">
									Search results
								</GoabText>
								<GoabText size="body-m" colour="secondary" mb="none">
									{results.length} result{results.length === 1 ? "" : "s"} found
								</GoabText>
							</div>

							<div className="results-list">
								{results.map((item) => (
									<GoabContainer
										key={item.id}
										type="non-interactive"
										accent="thin"
										heading={item.title}
									>
										<div className="result-meta">
											<GoabBadge type="information" content={item.category}></GoabBadge>
											<GoabBadge type="important" content={item.audience}></GoabBadge>
											<GoabBadge type="success" content={item.updated}></GoabBadge>
											{item.popular ? (
												<GoabBadge type="emergency" content="Popular"></GoabBadge>
											) : null}
										</div>
										<GoabText size="body-m" mb="xl">
											{item.description}
										</GoabText>
										<GoabButtonGroup alignment="start" gap="compact">
											<GoabButton size="compact">View service</GoabButton>
											<GoabButton type="secondary" size="compact">
												Save
											</GoabButton>
										</GoabButtonGroup>
									</GoabContainer>
								))}

								{results.length === 0 ? (
									<GoabNotification type="important" heading="No results found">
										Try fewer keywords, reset your filters, or switch to a broader category.
									</GoabNotification>
								) : null}
							</div>
						</section>
					</GoabBlock>
				</div>
			</GoabPageBlock>

			<section slot="footer">
				<GoabAppFooter maxContentWidth="100%" url="#">
					<GoabAppFooterNavSection maxColumnCount={1} heading="Services">
						<a href="#">Home</a>
						<a href="#">Contact Us</a>
						<a href="#">Help</a>
					</GoabAppFooterNavSection>
					<GoabAppFooterNavSection maxColumnCount={1} heading="Popular tasks">
						<a href="#">Registry Services</a>
						<a href="#">Land Titles</a>
						<a href="#">Consumer Protection</a>
					</GoabAppFooterNavSection>
					<GoabAppFooterMetaSection>
						<a href="#">Privacy</a>
						<a href="#">Accessibility</a>
						<a href="#">Terms of Use</a>
					</GoabAppFooterMetaSection>
				</GoabAppFooter>
			</section>
		</GoabOneColumnLayout>
	);
}
